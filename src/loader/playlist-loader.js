/*
 * playlist loader
 *
 */

import Event from '../events';
import observer from '../observer';
import { ErrorTypes, ErrorDetails } from '../errors';
//import {logger}             from '../utils/logger';

class PlaylistLoader {
    constructor(hls) {
        this.hls = hls;
        this.onml = this.onManifestLoading.bind(this);
        this.onll = this.onLevelLoading.bind(this);
        observer.on(Event.MANIFEST_LOADING, this.onml);
        observer.on(Event.LEVEL_LOADING, this.onll);
    }

    destroy() {
        if (this.loader) {
            this.loader.destroy();
            this.loader = null;
        }
        this.url = this.id = null;
        observer.off(Event.MANIFEST_LOADING, this.onml);
        observer.off(Event.LEVEL_LOADING, this.onll);
    }

    onManifestLoading(event, data) {
        this.load(data.url, null);
    }

    onLevelLoading(event, data) {
        this.load(data.url, data.level);
    }

    load(url, requestId) {
        var config = this.hls.config;
        this.url = url;
        this.id = requestId;
        this.loader = new config.loader();
        this.loader.load(
            url,
            '',
            this.loadsuccess.bind(this),
            this.loaderror.bind(this),
            this.loadtimeout.bind(this),
            config.manifestLoadingTimeOut,
            config.manifestLoadingMaxRetry,
            config.manifestLoadingRetryDelay
        );
    }

    resolve(url, baseUrl) {
        var doc = document,
            oldBase = doc.getElementsByTagName('base')[0],
            oldHref = oldBase && oldBase.href,
            docHead = doc.head || doc.getElementsByTagName('head')[0],
            ourBase = oldBase || docHead.appendChild(doc.createElement('base')),
            resolver = doc.createElement('a'),
            resolvedUrl;

        ourBase.href = baseUrl;
        resolver.href = url;
        resolvedUrl = resolver.href; // browser magic at work here

        if (oldBase) {
            oldBase.href = oldHref;
        } else {
            docHead.removeChild(ourBase);
        }
        return resolvedUrl;
    }

    parseMasterPlaylist(string, baseurl) {
        var levels = [],
            level = {},
            result,
            codecs,
            codec;
        var re = /#EXT-X-STREAM-INF:([^\n\r]*(BAND)WIDTH=(\d+))?([^\n\r]*(CODECS)=\"(.*)\",)?([^\n\r]*(RES)OLUTION=(\d+)x(\d+))?([^\n\r]*(NAME)=\"(.*)\")?[^\n\r]*[\r\n]+([^\r\n]+)/g;
        while ((result = re.exec(string)) != null) {
            result.shift();
            result = result.filter(function(n) {
                return n !== undefined;
            });
            level.url = this.resolve(result.pop(), baseurl);
            while (result.length > 0) {
                switch (result.shift()) {
                    case 'RES':
                        level.width = parseInt(result.shift());
                        level.height = parseInt(result.shift());
                        break;
                    case 'BAND':
                        level.bitrate = parseInt(result.shift());
                        break;
                    case 'NAME':
                        level.name = result.shift();
                        break;
                    case 'CODECS':
                        codecs = result.shift().split(',');
                        while (codecs.length > 0) {
                            codec = codecs.shift();
                            if (codec.indexOf('avc1') !== -1) {
                                level.videoCodec = this.avc1toavcoti(codec);
                            } else {
                                level.audioCodec = codec;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            levels.push(level);
            level = {};
        }
        return levels;
    }

    avc1toavcoti(codec) {
        var result,
            avcdata = codec.split('.');
        if (avcdata.length > 2) {
            result = avcdata.shift() + '.';
            result += parseInt(avcdata.shift()).toString(16);
            result += ('00' + parseInt(avcdata.shift()).toString(16)).substr(
                -4
            );
        } else {
            result = codec;
        }
        return result;
    }

    parseLevelPlaylist(string, baseurl, id) {
        var currentSN = 0,
            totalduration = 0,
            level = { url: baseurl, fragments: [], live: true, startSN: 0 },
            result,
            regexp,
            cc = 0;
        regexp = /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT(INF):([\d\.]+)[^\r\n]*[\r\n]+([^\r\n]+)|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DIS)CONTINUITY))/g;
        while ((result = regexp.exec(string)) !== null) {
            result.shift();
            result = result.filter(function(n) {
                return n !== undefined;
            });
            switch (result[0]) {
                case 'MEDIA-SEQUENCE':
                    currentSN = level.startSN = parseInt(result[1]);
                    break;
                case 'TARGETDURATION':
                    level.targetduration = parseFloat(result[1]);
                    break;
                case 'ENDLIST':
                    level.live = false;
                    break;
                case 'DIS':
                    cc++;
                    break;
                case 'INF':
                    var duration = parseFloat(result[1]);
                    level.fragments.push({
                        url: this.resolve(result[2], baseurl),
                        duration: duration,
                        start: totalduration,
                        sn: currentSN++,
                        level: id,
                        cc: cc
                    });
                    totalduration += duration;
                    break;
                default:
                    break;
            }
        }
        //logger.log('found ' + level.fragments.length + ' fragments');
        level.totalduration = totalduration;
        level.endSN = currentSN - 1;
        return level;
    }

    loadsuccess(event, stats) {
        var string = event.currentTarget.responseText,
            url = event.currentTarget.responseURL,
            id = this.id,
            levels;
        // responseURL not supported on some browsers (it is used to detect URL redirection)
        if (url === undefined) {
            // fallback to initial URL
            url = this.url;
        }
        stats.tload = new Date();
        stats.mtime = new Date(
            event.currentTarget.getResponseHeader('Last-Modified')
        );

        if (string.indexOf('#EXTM3U') === 0) {
            if (string.indexOf('#EXTINF:') > 0) {
                // 1 level playlist
                // if first request, fire manifest loaded event, level will be reloaded afterwards
                // (this is to have a uniform logic for 1 level/multilevel playlists)
                if (this.id === null) {
                    observer.trigger(Event.MANIFEST_LOADED, {
                        levels: [{ url: url }],
                        url: url,
                        stats: stats
                    });
                } else {
                    observer.trigger(Event.LEVEL_LOADED, {
                        details: this.parseLevelPlaylist(string, url, id),
                        level: id,
                        stats: stats
                    });
                }
            } else {
                levels = this.parseMasterPlaylist(string, url);
                // multi level playlist, parse level info
                if (levels.length) {
                    observer.trigger(Event.MANIFEST_LOADED, {
                        levels: levels,
                        url: url,
                        id: id,
                        stats: stats
                    });
                } else {
                    observer.trigger(Event.ERROR, {
                        type: ErrorTypes.NETWORK_ERROR,
                        details: ErrorDetails.MANIFEST_PARSING_ERROR,
                        fatal: true,
                        url: url,
                        reason: 'no level found in manifest'
                    });
                }
            }
        } else {
            observer.trigger(Event.ERROR, {
                type: ErrorTypes.NETWORK_ERROR,
                details: ErrorDetails.MANIFEST_PARSING_ERROR,
                fatal: true,
                url: url,
                reason: 'no EXTM3U delimiter'
            });
        }
    }

    loaderror(event) {
        var details;
        if (this.id === null) {
            details = ErrorDetails.MANIFEST_LOAD_ERROR;
        } else {
            details = ErrorDetails.LEVEL_LOAD_ERROR;
        }
        this.loader.abort();
        observer.trigger(Event.ERROR, {
            type: ErrorTypes.NETWORK_ERROR,
            details: details,
            fatal: true,
            url: this.url,
            loader: this.loader,
            response: event.currentTarget,
            level: this.id
        });
    }

    loadtimeout() {
        var details;
        if (this.id === null) {
            details = ErrorDetails.MANIFEST_LOAD_TIMEOUT;
        } else {
            details = ErrorDetails.LEVEL_LOAD_TIMEOUT;
        }
        this.loader.abort();
        observer.trigger(Event.ERROR, {
            type: ErrorTypes.NETWORK_ERROR,
            details: details,
            fatal: true,
            url: this.url,
            loader: this.loader,
            level: this.id
        });
    }
}

export default PlaylistLoader;

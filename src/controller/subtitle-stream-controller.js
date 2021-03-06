/**
 * @class SubtitleStreamController
 */

import Event from '../events';
import { logger } from '../utils/logger';
import Decrypter from '../crypt/decrypter';
import { BufferHelper } from '../utils/buffer-helper';
import { findFragmentByPDT, findFragmentByPTS } from './fragment-finders';
import { FragmentState } from './fragment-tracker';
import BaseStreamController, { State } from './base-stream-controller';
import { mergeSubtitlePlaylists } from './level-helper';

const { performance } = window;
const TICK_INTERVAL = 500; // how often to tick in ms

export class SubtitleStreamController extends BaseStreamController {
  constructor (hls, fragmentTracker) {
    super(hls,
      Event.MEDIA_ATTACHED,
      Event.MEDIA_DETACHING,
      Event.ERROR,
      Event.KEY_LOADED,
      Event.FRAG_LOADED,
      Event.SUBTITLE_TRACKS_UPDATED,
      Event.SUBTITLE_TRACK_SWITCH,
      Event.SUBTITLE_TRACK_LOADED,
      Event.SUBTITLE_FRAG_PROCESSED,
      Event.LEVEL_UPDATED);

    this.fragmentTracker = fragmentTracker;
    this.config = hls.config;
    this.state = State.STOPPED;
    this.tracks = [];
    this.tracksBuffered = [];
    this.currentTrackId = -1;
    this.decrypter = new Decrypter(hls, hls.config);
    // lastAVStart stores the time in seconds for the start time of a level load
    this.lastAVStart = 0;
    this._onMediaSeeking = this.onMediaSeeking.bind(this);
  }

  onSubtitleFragProcessed (data) {
    const { frag, success } = data;
    this.fragPrevious = frag;
    this.state = State.IDLE;
    if (!success) {
      return;
    }

    const buffered = this.tracksBuffered[this.currentTrackId];
    if (!buffered) {
      return;
    }

    // Create/update a buffered array matching the interface used by BufferHelper.bufferedInfo
    // so we can re-use the logic used to detect how much have been buffered
    let timeRange;
    const fragStart = frag.start;
    for (let i = 0; i < buffered.length; i++) {
      if (fragStart >= buffered[i].start && fragStart <= buffered[i].end) {
        timeRange = buffered[i];
        break;
      }
    }

    const fragEnd = frag.start + frag.duration;
    if (timeRange) {
      timeRange.end = fragEnd;
    } else {
      timeRange = {
        start: fragStart,
        end: fragEnd
      };
      buffered.push(timeRange);
    }
  }

  onMediaAttached ({ media }) {
    this.media = media;
    media.addEventListener('seeking', this._onMediaSeeking);
    this.state = State.IDLE;
  }

  onMediaDetaching () {
    if (!this.media) {
      return;
    }
    this.media.removeEventListener('seeking', this._onMediaSeeking);
    this.fragmentTracker.removeAllFragments();
    this.currentTrackId = -1;
    this.tracks.forEach((track) => {
      this.tracksBuffered[track.id] = [];
    });
    this.media = null;
    this.state = State.STOPPED;
  }

  // If something goes wrong, proceed to next frag, if we were processing one.
  onError (data) {
    //Commenting out this code since we need to reset the state for any error
    // let frag = data.frag;
    // // don't handle error not related to subtitle fragment
    // if (!frag || frag.type !== 'subtitle') {
    //   return;
    // }
    this.state = State.IDLE;
  }

  // Got all new subtitle tracks.
  onSubtitleTracksUpdated (data) {
    logger.log('subtitle tracks updated');
    this.tracksBuffered = [];
    this.tracks = data.subtitleTracks;
    this.tracks.forEach((track) => {
      this.tracksBuffered[track.id] = [];
    });
  }

  onSubtitleTrackSwitch (data) {
    this.currentTrackId = data.id;

    if (!this.tracks || !this.tracks.length || this.currentTrackId === -1) {
      this.clearInterval();
      return;
    }

    // Check if track has the necessary details to load fragments
    const currentTrack = this.tracks[this.currentTrackId];
    if (currentTrack && currentTrack.details) {
      this.setInterval(TICK_INTERVAL);
    }
  }

  // Got a new set of subtitle fragments.
  onSubtitleTrackLoaded (data) {
    const { id, details } = data;
    const { currentTrackId, tracks } = this;
    const currentTrack = tracks[currentTrackId];
    if (id >= tracks.length || id !== currentTrackId || !currentTrack) {
      return;
    }

    if (details.live) {
      mergeSubtitlePlaylists(currentTrack.details, details, this.lastAVStart);
    }
    currentTrack.details = details;
    this.setInterval(TICK_INTERVAL);
  }

  onKeyLoaded () {
    if (this.state === State.KEY_LOADING) {
      this.state = State.IDLE;
    }
  }

  onFragLoaded (data) {
    const fragCurrent = this.fragCurrent;
    const decryptData = data.frag.decryptdata;
    const fragLoaded = data.frag;
    const hls = this.hls;

    if (this.state === State.FRAG_LOADING &&
        fragCurrent &&
        data.frag.type === 'subtitle' &&
        fragCurrent.sn === data.frag.sn) {
      // check to see if the payload needs to be decrypted
      if (data.payload.byteLength > 0 && (decryptData && decryptData.key && decryptData.method === 'AES-128')) {
        let startTime = performance.now();

        // decrypt the subtitles
        this.decrypter.decrypt(data.payload, decryptData.key.buffer, decryptData.iv.buffer, function (decryptedData) {
          let endTime = performance.now();
          hls.trigger(Event.FRAG_DECRYPTED, { frag: fragLoaded, payload: decryptedData, stats: { tstart: startTime, tdecrypt: endTime } });
        });
      }
    }
  }

  onLevelUpdated ({ details }) {
    const frags = details.fragments;
    this.lastAVStart = frags.length ? frags[0].start : 0;
  }

  doTick () {
    if (!this.media) {
      this.state = State.IDLE;
      return;
    }

    switch (this.state) {
    case State.IDLE: {
      const { config, currentTrackId, fragmentTracker, media, tracks } = this;
      if (!tracks || !tracks[currentTrackId] || !tracks[currentTrackId].details) {
        break;
      }

      const { maxBufferHole, maxFragLookUpTolerance } = config;
      const maxConfigBuffer = Math.min(config.maxBufferLength, config.maxMaxBufferLength);
      const bufferedInfo = BufferHelper.bufferedInfo(this._getBuffered(), media.currentTime, maxBufferHole);
      const { end: bufferEnd, len: bufferLen } = bufferedInfo;

      const trackDetails = tracks[currentTrackId].details;
      const fragments = trackDetails.fragments;
      const fragLen = fragments.length;
      const end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration;

      if (bufferLen > maxConfigBuffer) {
        return;
      }

      let foundFrag;
      const fragPrevious = this.fragPrevious;
      if (bufferEnd < end) {
        if (fragPrevious && trackDetails.hasProgramDateTime) {
          foundFrag = findFragmentByPDT(fragments, fragPrevious.endProgramDateTime, maxFragLookUpTolerance);
        }
        if (!foundFrag) {
          foundFrag = findFragmentByPTS(fragPrevious, fragments, bufferEnd, maxFragLookUpTolerance);
        }
        if (!foundFrag && trackDetails.live && fragPrevious && fragPrevious.start < fragments[0].start) {
          /*
          below is a real world example of what can happen in production. 
          
          fragPrevious  s:04:08:44.000Z, e:04:08:49.000Z -- was found by PDT
          
          # response on subtitle/en/playlist.m3u8 on Nth call
          fragments[0]: s:04:08:24.000Z, e:04:08:29.000Z -- s:4532.900002, e:4537.900002
          fragments[1]: s:04:08:29.000Z, e:04:08:34.000Z -- s:4537.900002, e:4542.900002
          fragments[2]: s:04:08:34.000Z, e:04:08:39.000Z -- s:4542.900002, e:4547.900002
          fragments[3]: s:04:08:39.000Z, e:04:08:44.000Z -- s:4547.900002, e:4552.900002
          fragments[4]: s:04:08:44.000Z, e:04:08:49.000Z -- s:4552.900002, e:4557.900002

          # response on subtitle/en/playlist.m3u8 on (N+1)th call
          fragments[0]: s:04:08:54.000Z, e:04:08:59.000Z -- s:4562.900002, e:4567.900002
          fragments[1]: s:04:08:59.000Z, e:04:09:04.000Z -- s:4567.900002, e:4572.900002
          fragments[2]: s:04:09:04.000Z, e:04:09:09.000Z -- s:4572.900002, e:4577.900002
          fragments[3]: s:04:09:09.000Z, e:04:09:14.000Z -- s:4577.900002, e:4582.900002
          fragments[4]: s:04:09:14.000Z, e:04:09:19.000Z -- s:4582.900002, e:4587.900002

          # notice the gap from e:04:08:49.000Z to s:04:08:54.000Z, code below is to fix this issue
          */
          
         foundFrag = fragments[0];
         logger.warn(`Gap detected in live subtitle playlist, using next available fragment {start: ${foundFrag.start}}`);
        }

      } else {
        foundFrag = fragments[fragLen - 1];
      }

      if (foundFrag && foundFrag.encrypted) {
        logger.log(`Loading key for ${foundFrag.sn}`);
        this.state = State.KEY_LOADING;
        this.hls.trigger(Event.KEY_LOADING, { frag: foundFrag });
      } else if (foundFrag && this.fragmentTracker.getState(foundFrag) === FragmentState.NOT_LOADED) {
        // only load if fragment is not loaded        
        this.fragCurrent = foundFrag;
        this.state = State.FRAG_LOADING;
        this.hls.trigger(Event.FRAG_LOADING, { frag: foundFrag });
      }
    }
    }
  }

  stopLoad () {
    this.lastAVStart = 0;
    super.stopLoad();
  }

  _getBuffered () {
    return this.tracksBuffered[this.currentTrackId] || [];
  }

  onMediaSeeking () {
    this.fragPrevious = null;
  }
}

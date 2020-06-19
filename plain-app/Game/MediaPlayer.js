import EventEmitter from './events';
import playAudio from './utils/playAudio';

window.AudioContext = window.AudioContext ||  window.webkitAudioContext;

export default class MediaPlayer extends EventEmitter {
  statusEnum = {
    INITED: 'INITED',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPED: 'STOPED',
    DISABLED: 'DISABLED'
  }
  constructor(opts) {
    super();
    // this.$container = opts.$container || document.body;
    this.currentSrc = '';
    this.status = this.statusEnum.INITED;
    this.volume = 30;

    this.playFns = {};

    // this.initAudioElement();
    this.bindEvents();
  }
  initAudioElement() {
    const $audio = document.createElement('audio');
    $audio.style.display = 'none';
    this.$container.appendChild($audio);
    this.$audio = $audio;
  }
  bindEvents() {

  }
  loadByAudioElement(src, opts, cb, errorCb) {
    this.currentSrc = src;

    Object.keys(opts).forEach(attrName => {
      this.$audio[attrName] = opts[attrName];
    });

    this.$audio.oncanplay = () => {
      cb();
      this.emit('load');
    };
    this.$audio.onerror = () => {
      errorCb();
      this.emit('failedToLoad');
    };
    this.$audio.src = this.currentSrc;
  }
  play(src) {
    if (this.status === this.statusEnum.DISABLED) {
      return;
    }
    this.status = this.statusEnum.PLAYING;
    this.currentSrc = src;

    let playFn = this.playFns[src];
    if (playFn) {
      playFn();
    } else {
      playFn = playAudio(src);
      this.playFns[src] = playFn;
      playFn();
    }
    this.emit('play');
  }
  pause() {
    this.status = this.statusEnum.PAUSED;
    this.emit('pause');
  }
  stop() {
    this.status = this.statusEnum.STOPED;
    this.emit('stop');
  }
  enable() {
    this.status = this.statusEnum.INITED;
    this.emit('enabled');
  }
  disable() {
    this.status = this.statusEnum.DISABLED;
    this.emit('disabled');
  }
}

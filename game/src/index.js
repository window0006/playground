import EventEmitter from './events';
import Stage from './Stage';
import MediaPlayer from './MediaPlayer';

export default class Game extends EventEmitter {
  gameStatusEnum = {
    INITED: 'INITED',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    OVERED: 'OVERED',
    STOPED: 'STOPED'
  }
  constructor(opts) {
    super();

    this.opts = opts;

    this.width = opts.width || window.innerWidth;
    this.height = opts.height || window.innerHeight;
    this.$container = opts.$container || document.body;

    this.status = this.gameStatusEnum.INITED;
    this.stages = [];
    this.stagesMap = {};
    this.currentStage = null;

    // this.resources = {};
    this.musicPlayer = new MediaPlayer();

    this.reset();
    this.bindEvents();
  }

  addStage(stageName) {
    if (this.stagesMap[stageName]) {
      return;
    }
    const stage = new Stage({
      $container: this.$container,
      game: this
    });
    this.stages.push(stage);
    this.stagesMap[stageName] = stage;

    stage.on('remove', () => {
      if (this.currentStage === stage) {
        this.currentStage = null;
      }

      this.stages = this.stages.filter(temp => temp !== stage);
      delete this.stagesMap[stageName];
    });

    return stage;
  }

  switchToStage(stageName) {
    const stage = this.stagesMap[stageName];
    if (!stage) {
      return;
    }
    if (this.currentStage) {
      this.currentStage.hide();
    }
    stage.show();
    this.currentStage = stage;

    this.emit('switchStage');
  }

  removeStage(stageName) {
    const stage = this.stagesMap[stageName];
    if (!stage) {
      return;
    }
    stage.remove();
  }

  bindEvents() {

  }

  animationLoop() {
    requestAnimationFrame(() => {
      if (
        this.status === this.gameStatusEnum.PAUSED
        || this.status === this.gameStatusEnum.STOPED
      ) {
        return;
      }
      this.update();
      this.animationLoop();
    });
  }
  start() {
    if (
      this.status !== this.gameStatusEnum.INITED
      && this.status !== this.gameStatusEnum.STOPED
    ) {
      return;
    }
    this.status = this.gameStatusEnum.PLAYING;

    this.reset();
    this.animationLoop();

    this.emit('start');
  }
  restart() {
    if (this.status !== this.gameStatusEnum.PAUSED) {
      return;
    }
    this.status = this.gameStatusEnum.PLAYING;

    this.animationLoop();

    this.emit('restart');
  }
  pause() {
    if (this.status !== this.gameStatusEnum.PLAYING) {
      return;
    }

    this.status = this.gameStatusEnum.PAUSED;

    this.emit('pause');
  }
  over() {
    if (
      this.status === this.gameStatusEnum.OVERED
      || this.status === this.gameStatusEnum.STOPED
    ) {
      return;
    }

    this.status = this.gameStatusEnum.OVERED;

    this.emit('over');
  }
  stop() {
    if (this.status === this.gameStatusEnum.STOPED) {
      return;
    }

    this.status = this.gameStatusEnum.STOPED;

    this.emit('stop');
  }
  update() {
    this.currentStage.update();
  }
  reset() {
    this.stages.forEach(stage => stage.remove());

    this.emit('reset');
  }
  emitCustomEvent(eName, ...restArgs) {
    this.emit(eName, ...restArgs);
  }
}


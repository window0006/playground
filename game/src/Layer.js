import EventEmitter from './events';
import Item from './Item';

export default class Layer extends EventEmitter {
  constructor(opts) {
    super();

    this.opts = opts;

    this.init();
  }
  init() {
    const { opts } = this;

    this.items = [];
    this.itemsMap = {};

    this.game = opts.game;
    this.stage = opts.stage;
    this.$container = opts.$container;

    this.initCanvas();
  }
  initCanvas() {
    const { width, height } = this.stage;
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;

    const $canvas = document.createElement('canvas');
    const $offscreenCanvas = document.createElement('canvas');
    $canvas.width = $offscreenCanvas.width = this.width;
    $canvas.height = $offscreenCanvas.height = this.height;

    this.$canvas = $canvas;
    this.realCtx = $canvas.getContext('2d');

    this.$offscreenCanvas = $offscreenCanvas;
    this.ctx = $offscreenCanvas.getContext('2d');

    this.$container.appendChild($canvas);
  }
  addItem(config) {
    const { Constructor = Item } = config;
    const item = new Constructor({
      ...config,
      layer: this,
      stage: this.stage,
      game: this.game
    });

    item.on('load', () => {
      const { zIndex } = item;
      if (!this.items[zIndex]) {
        this.items[zIndex] = [];
      }
      this.items[zIndex].push(item);

      const { name } = item;
      if (!name) {
        return;
      }
      this.itemsMap[name] = item;
    });

    item.on('remove', () => this.removeItem(item.id));

    return item;
  }
  removeItem(itemId) {
    let itemName;

    this.items.forEach((innerLayerItems, index) => {
      this.items[index] = innerLayerItems.filter(({ id, name }) => {
        if (id === itemId) {
          itemName = name;
          return false;
        }
        return true;
      });
    });

    if (itemName) {
      delete this.itemsMap[itemName];
    }
  }
  update() {
    const { width, height } = this;
    this.ctx.clearRect(0, 0, width, height);
    this.realCtx.clearRect(0, 0, width, height);

    this.items.forEach(innerLayerItems => {
      innerLayerItems.forEach((item) => {
        item.doUpdate();
        item.doRender();
      });
    });

    this.realCtx.drawImage(this.$offscreenCanvas, 0, 0, width, height);
  }
  remove() {
    this.$container.removeChild(this.$canvas);
    this.emit('remove');
    // 事件要在emit后面移除
    this.removeAllListeners();
  }
}

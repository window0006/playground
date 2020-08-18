import EventEmitter from './events';
import Layer from './Layer';
import { Polygon } from './shapes';

export default class Stage extends EventEmitter {
  constructor(opts) {
    super();
    this.opts = opts;

    this.initAttrs();
    this.initStageShape();
    this.bindEvents();
    this.initItems();
  }
  initStageShape() {
    const { width, height } = this;
    this.shape = new Polygon([
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height }
    ], this.ctx);
  }
  initAttrs() {
    const { opts } = this;

    this.game = opts.game;
    this.width = opts.width || window.innerWidth;
    this.height = opts.width || window.innerHeight;
    this.$container = opts.$container;

    this.layers = [];
    this.layersMap = {};

    this.$element = document.createElement('div');
    this.$element.style.cssText = `display: none;width: px;height: px; overflow: hidden;`;

    this.$container.appendChild(this.$element);
  }
  bindEvents() {
    const interactiveEvents = [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel'
    ];
    interactiveEvents.forEach(eventType => {
      this.$element.addEventListener(eventType, (e) => {
        if (this.game.status !== this.game.gameStatusEnum.PLAYING) {
          return;
        }
        this.emit('interactive', e, eventType);
      }, false);
    });
  }
  addLayer(layerName = 'defaultLayer') {
    if (this.layersMap[layerName]) {
      return;
    }
    const layer = new Layer({
      game: this.game,
      stage: this,
      $container: this.$element
    });
    this.layers.push(layer);
    this.layersMap[layerName] = layer;

    layer.on('remove', () => {
      this.layers = this.layers.filter(temp => temp !== layer);
      delete this.layersMap[layerName];
    });

    return layer;
  }
  removeLayer(layerName) {
    const layer = this.layersMap[layerName];
    if (!layer) {
      return;
    }
    layer.remove();
  }
  initItems() {
    const { items = [] } = this.opts;

    items.forEach(config => this.addItem(config));
  }
  addItem(config = {}) {
    // items 在layer中维护
    const { layer: layerName = 'defaultLayer' } = config;

    let layer = this.layersMap[layerName];
    if (!layer) {
      layer = this.addLayer(layerName);
    }
    return layer.addItem(config);
  }
  show() {
    this.$element.style.display = 'block';
    this.emit('show');
  }
  hide() {
    this.$element.style.display = 'none';
    this.emit('hide');
  }
  update() {
    this.layers.forEach(layer => layer.update());
  }

  getItemsByName(name = '') {
    // 需要在layer中寻找item
    let result = [];

    this.layers.forEach(({ items = [], itemsMap = {} }) => {
      const temp = itemsMap[name];
      if (temp) {
        result.push(temp);
      }
    });

    return result;
  }
  getItemsByFilter(filter = () => {}) {
    let result = [];
    this.layers.forEach(({ items = [] }) => {
      items.forEach(innerLayerItems => {
        result = [
          ...result,
          ...innerLayerItems.filter(filter)
        ];
      });
    });

    return result;
  }
  remove() {
    this.layers.forEach(layer => layer.remove());
    this.$container.removeChild(this.$element);

    this.emit('remove');

    this.removeAllListeners();
  }
}

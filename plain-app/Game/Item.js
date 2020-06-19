import EventEmitter from './events';
import { Polygon, Round, shapeTypesEnum } from './shapes';

let itemId = 0;

const defaultOpts = {
  x: 0,
  y: 0,
  radius: 0,
  rotateAngle: 0,
  imageSrc: '', // todo 一张空的1px的png base64
  isInteractivable: false,
  shapeType: shapeTypesEnum.POLYGON,
  collisionTargets: [],
  isOverflowable: true
};

export default class Item extends EventEmitter {
  itemStatusEnum = {
    LOADED: 'LOADED',
    RENDERED: 'RENDERED',
    REMOVED: 'REMOVED'
  }
  constructor(opts) {
    super();
    this.id = itemId ++;

     // todo opts writable = false
    this.opts = {
      ...defaultOpts,
      ...opts
    };

    this.init();
  }
  async init() {
    this.initAttrs();

    try {
      await this.load();
    } catch (e) {
      this.emit('failedToLoad');
      this.remove();
      return;
    }

    this.initShape();
    this.bindEvents();

    this.emit('load');
  }
  initAttrs() {
    const { opts } = this;

    this.game = opts.game;
    this.stage = opts.stage;
    this.layer = opts.layer;
    this.ctx = this.layer.ctx;

    this.name = opts.name;
    // 左上角起始坐标 或者圆心
    this.x = opts.x;
    this.y = opts.y;

    this.shapeType = opts.shapeType || shapeTypesEnum.POLYGON;

    if (this.shapeType === shapeTypesEnum.ROUND) {
      this.radiusX = opts.radiusX || opts.radius;
      this.radiusY = opts.radiusY || opts.radius;
    }

    this.width = opts.width;
    this.height = opts.height;
    // 起始旋转角度，旋转方式：中心旋转
    this.rotateAngle = (opts.rotateAngle || 0) * Math.PI / 180;
    this.zIndex = opts.zIndex || 0;
    this.isInteractivable = opts.isInteractivable;

    if (this.opts.imageSrc) {
      this.imageSrc = opts.imageSrc;
    }

    if (opts.isDragable) {
      this.isDragableX = true;
      this.isDragableY = true;
    }
    if (opts.isDragableX !== undefined) {
      this.isDragableX = opts.isDragableX;
    }
    if (opts.isDragableY !== undefined) {
      this.isDragableY = opts.isDragableY;
    }

    if (this.isDragableX || this.isDragableY) {
      this.isInteractivable = true;
    }

    if (opts.isOverflowable) {
      this.isOverflowableX = true;
      this.isOverflowableY = true;
    }
    if (opts.isOverflowableX !== undefined) {
      this.isOverflowableX = opts.isOverflowableX;
    }
    if (opts.isOverflowableY !== undefined) {
      this.isOverflowableY = opts.isOverflowableY;
    }

    this.collisionTargets = opts.collisionTargets;
    this.isOverflowable = opts.isOverflowable;
  }
  bindEvents() {
    this.on('load', function () {
      this.status = this.itemStatusEnum.LOADED;
    });
    this.once('render', () => {
      this.status = this.itemStatusEnum.RENDERED;
    });
    this.on('remove', () => {
      this.status = this.itemStatusEnum.REMOVED;
    });

    this.on('invisible', () => {
      this.remove();
    });

    if (this.isInteractivable) {
      this.bindInteractivieEvents();
    }

    if (this.isDragableX || this.isDragableY) {
      this.bindDragableEvents();
    }
  }
  bindInteractivieEvents() {
    let isTouched = false;

    this.interactiveCb = (e, type) => {
      if (this.status !== this.itemStatusEnum.RENDERED) {
        return;
      }

      if (type === 'touchstart') {
        (Array.prototype.slice.call(e.touches)).forEach(({ pageX, pageY, radiusX, radiusY }) => {
          const tempShape = new Round(pageX, pageY, radiusX, radiusY, this.ctx);

          if (tempShape.isCollidesWith(this.shape)) {
            this.emit('touchstart', e);
          }
        });
      } else if (isTouched) {
        this.emit(type, e);
      }
    }
    this.stage.on('interactive', this.interactiveCb);

    this.on('touchstart', (e) => {
      isTouched = true;
      // console.log('touchstart. id:', this.id);
    });

    this.on('touchend', (e) => {
      isTouched = false;
      // console.log('touchend. id:', this.id);
    });

    this.on('touchcancel', (e) => {
      isTouched = false;
      // console.log('touchcancel. id:', this.id);
    });
  }
  bindDragableEvents() {
    let tempGapX = 0, tempGapY = 0;
    this.on('touchmove', (e) => {
      const { pageX, pageY } = e.touches[0];
      if (!tempGapX) {
        tempGapX = pageX - this.x;
      }
      if (!tempGapY) {
        tempGapY = pageY - this.y;
      }
      let dx = pageX - tempGapX - this.x;
      let dy = pageY - tempGapY - this.y;

      if (!this.isDragableX) {
        dx = 0;
      }

      if (!this.isDragableY) {
        dy = 0;
      }

      this.move(dx, dy);
    });

    this.on('touchend', () => {
      tempGapX = 0;
      tempGapY = 0;
    });

    this.on('touchcancel', () => {
      tempGapX = 0;
      tempGapY = 0;
    });
  }
  async load() {
    return new Promise((resolve, reject) => {
      if (!this.imageSrc) {
        resolve();
        return;
      }
      const image = new Image();
      image.onload = () => {
        if (this.width === undefined) {
          this.width = image.width;
        }
        if (this.height === undefined) {
          this.height = image.height;
        }
        resolve(image);
      };
      image.onerror = () => {
        reject(image);
      };
      image.src = this.imageSrc;
      this.image = image;
    });
  }
  initShape() {
    switch(this.shapeType) {
      case shapeTypesEnum.ROUND:
        this.shape = new Round(this.x, this.y, this.radiusX, this.radiusY);
        break;
      case shapeTypesEnum.POLYGON:
      default: {
        if (!this.width || !this.height) {
          break;
        }
        this.shape = new Polygon(this.getPoints(), this.ctx);
        break;
      }
    }
  }
  getPoints() {
    const { x, y, width: w, height: h } = this;

    // 中心点
    const o = {
      x: x + w / 2,
      y: y + h / 2
    };
    const points = [
      { x, y },
      { x: x + w, y },
      { x: x + w, y: y + h},
      { x, y: y + h}
    ].map(p => this.getRotatedPoint(p, o));

    return points;
  }
  getRotatedPoint({ x, y }, { x: ox, y: oy }) {
    const { rotateAngle } = this;

    const x1 = x - ox;
    const y1 = y - oy;

    const l = Math.sqrt(Math.pow(x1, 2) + Math.pow(y, 2));

    return {
      x: l * ((x1 / l) * Math.cos(rotateAngle) + (y1 / l) * Math.sin(rotateAngle)) + ox,
      y: -(l * ((y1 / l) * Math.cos(rotateAngle) - (x1 / l) * Math.sin(rotateAngle))) + oy
    };
  }
  shouldRender() {
    if (!this.shape) {
      return true;
    }

    const _shouldRender = this.shape.isCollidesWith(this.stage.shape);

    if (!this._shouldRender && _shouldRender) {
      this.emit('visible');
    }
    if (this._shouldRender && !_shouldRender) {
      this.emit('invisible');
    }

    this._shouldRender = _shouldRender;
    return _shouldRender;
  }
  doUpdate() {
    if (!this.shouldUpdate()) {
      return;
    }
    this.emit('beforeUpdate');
    if (this.update) {
      this.update();
    }
    this.emit('update');
  }
  doRender() {
    if (!this.shouldRender()) {
      return;
    }
    this.emit('beforeRender');
    if (this.render) {
      this.render();
    }
    this.emit('render');
  }
  remove() {
    // layer中需要移除对item的引用
    this.emit('remove');

    this.removeAllListeners();

    if (this.isInteractivable) {
      this.stage.removeListener('interactive', this.interactiveCb);
    }
  }
  move(dx, dy) {
    const { x, y, width, height, stage } = this;

    if (!this.isOverflowableX) {
      // todo round
      this.x = Math.min(Math.max(0, x + dx), stage.width - width);
      dx = this.x - x;
    } else {
      this.x += dx;
    }

    if (!this.isOverflowableY) {
      this.y = Math.min(Math.max(0, y + dy), stage.height - height);
      dy = this.y - y;
    } else {
      this.y += dy;
    }
    if (this.shape) {
      this.shape.move(dx, dy);
    }

    this.emit('move', dx, dy);
  }
  moveTo(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;

    this.move(dx, dy);
  }
  detectCollision() {
    const targets = this.getCollisionTargets();

    if (!targets || !targets.length) {
      return;
    }

    targets.forEach(targetItem => {
      if (this.shape.isCollidesWith(targetItem.shape)) {
        this.emit('collide', targetItem);
      }
    });
  }
  // should be implemented
  shouldUpdate() {
    return this.game.status === this.game.gameStatusEnum.PLAYING;
  }
  // should be implemented
  render() {
    const { x, y, width, height, rotateAngle, image, ctx } = this;

    ctx.save();

    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rotateAngle);

    if (image) {
      ctx.drawImage(image, - width / 2, - height / 2, width, height);
    }

    ctx.restore();
    // this.shape.draw();
  }
  // should be implemented
  getCollisionTargets() {
    return this.collisionTargets;
  }
}

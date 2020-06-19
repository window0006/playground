import Item from '../Game/Item';
import Score from './Score';
import Lottie from 'lottie-web';

export default class Box extends Item {
  constructor(opts) {
    super(opts);

    this.speed = opts.speed;
    this.score = opts.score;

    this.isGreatBox = opts.isGreatBox;

    this.boxName = opts.boxName;
    this.fontSize = opts.fontSize;
    this.padding = opts.padding;
    this.margin = opts.margin;
    this.boxNameBgColor = opts.boxNameBgColor;

    let musicSrc = '';
    if (this.isGreatBox) {
      musicSrc = 'https://gw.alipayobjects.com/mdn/rms_4344a9/afts/file/A*VU33SpUa8lkAAAAAAAAAAABjARQnAQ';
    } else {
      musicSrc = 'https://gw.alipayobjects.com/mdn/rms_4344a9/afts/file/A*pp67S6854kUAAAAAAAAAAABjARQnAQ';
    }
    // this.playAudio = playAudio(musicSrc)
    this.pickUpMusic = musicSrc;

    this.on('collide', (target) => {
      if (target.name === 'picker') {
        // todo this.game.playMusic(this.collodeMusic);
        this.remove();
        this.pick();
      }
    });
  }
  getCollisionTargets() {
    if (!this.picker) {
      const [picker] = this.stage.getItemsByName('picker');
      this.picker = picker;
    }
    return [this.picker];
  }
  update() {
    this.move(0, this.speed);

    if (this.y > 400) {
      this.detectCollision();
    }
  }
  pick() {
    this.showScore();
    this.game.emitCustomEvent('addScore', this.score);

    this.game.musicPlayer.play(this.pickUpMusic);
    // this.playAudio();
  }
  showScore() {
    const [picker] = this.stage.getItemsByName('picker');

    this.stage.addItem({
      Constructor: Score,
      score: this.score,
      x: this.x,
      y: picker.y
    });

    if (this.isGreatBox) {
      this.addGreatEffect();
    }
  }

  addGreatEffect() {
    const { $element: $container } = this.stage;
    const $effectContainer = document.createElement('div');
    $effectContainer.style.cssText = `position: absolute; top: ${this.picker.y - 120}px; left: ${this.picker.x - 35}px; width: 210px; height: 140px;`;
    $container.appendChild($effectContainer);

    Lottie.loadAnimation({
      container: $effectContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://gw.alipayobjects.com/os/lottie-asset/catch-prize/data.json/data-46426.json'
    });

    setTimeout(() => {
      Lottie.destroy();
      $container.removeChild($effectContainer);
    }, 600)
  }

  render() {
    const { x, y, width, height, rotateAngle, image, ctx } = this;

    ctx.save();

    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rotateAngle);

    ctx.drawImage(image, - width / 2, - height / 2, width, height);
    if (!this.isGreatBox) {
      this.renderBoxName();
    }

    ctx.restore();
  }
  renderBoxName() {
    const { width: w, height: h, ctx, boxName, boxNameBgColor, fontSize, padding, margin } = this;
    const radius = 3;

    let width = boxName.length * fontSize + padding[1] * 2;
    let height = fontSize + padding[0] * 2;

    let fixX = w / 2 - width - margin[1];
    let fixY = h / 2 - height - margin[0];

    // 圆角矩形
    ctx.save();
    ctx.beginPath();
    // 从右下角顺时针绘制，弧度从0到1/2PI
    ctx.arc(width - radius + fixX, height - radius + fixY, radius, 0, Math.PI / 2);
    // 矩形下边线
    ctx.lineTo(radius + fixX, height + fixY);
    // 左下角圆弧，弧度从1/2PI到PI
    ctx.arc(radius + fixX, height - radius + fixY, radius, Math.PI / 2, Math.PI);
    // 矩形左边线
    ctx.lineTo(0 + fixX, radius + fixY);
    // 左上角圆弧，弧度从PI到3/2PI
    ctx.arc(radius + fixX, radius + fixY, radius, Math.PI, Math.PI * 3 / 2);
    // 上边线
    ctx.lineTo(width - radius + fixX, 0 + fixY);
    // 右上角圆弧
    ctx.arc(width - radius + fixX, radius + fixY, radius, Math.PI * 3 / 2, Math.PI * 2);
    // 右边线
    ctx.lineTo(width + fixX, height - radius + fixY);
    ctx.closePath();

    ctx.fillStyle = boxNameBgColor;
    ctx.fill();

    ctx.font = `${this.fontSize}px PingFang-SC-Regular`;
    ctx.fillStyle = '#fff';
    ctx.fillText(this.boxName, fixX + padding[1], fixY + fontSize + padding[0] - 2);

    ctx.restore();
  }
}

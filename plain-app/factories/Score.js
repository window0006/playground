import Item from '../Game/Item';

export default class Score extends Item {
  constructor(opts) {
    super(opts);

    this.score = opts.score;
    this.opacity = 1;
  }
  shouldUpdate() {
    return this.game.status !== this.game.gameStatusEnum.STOPED;
  }
  update() {
    this.y -= 5;
    this.opacity -= 0.03;
  }
  render() {
    const text = `+`;
    const { ctx } = this;

    ctx.save();

    ctx.fillStyle = `rgba(255, 255, 255, )`;
    ctx.font = '45px 苹方-简';
    ctx.fillText(text, this.x, this.y);

    ctx.restore();

    if (this.opacity <= 0) {
      this.remove();
    }
  }
}

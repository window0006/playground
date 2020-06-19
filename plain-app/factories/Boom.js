import Item from '../Game/Item';

export default class Boom extends Item {
  constructor(opts) {
    super({
      ...opts,
      imageSrc: 'https://gw.alipayobjects.com/mdn/rms_b463f9/afts/img/A*CgGGRZACPPYAAAAAAAAAAABkARQnAQ'
    });

    this.speed = opts.speed;
    this.pickUpMusic = 'https://gw.alipayobjects.com/mdn/rms_4344a9/afts/file/A*EqJ4SJzanFEAAAAAAAAAAABjARQnAQ';

    this.on('collide', (target) => {
      if (target.name === 'picker') {
        this.remove();
        this.boom();
        this.game.over();
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
    this.detectCollision();
  }
  boom() {
    const { x, stage, picker } = this;
    const { y, height } = picker;
    const $tempElement = document.createElement('div');
    $tempElement.className = 'boom';
    $tempElement.style.top = `${y - height}px`;
    $tempElement.style.left = `${x}px`;
    stage.$element.appendChild($tempElement);

    this.game.musicPlayer.play(this.pickUpMusic);

    setTimeout(() => {
      stage.$element.removeChild($tempElement);
    }, 500);
  }
}

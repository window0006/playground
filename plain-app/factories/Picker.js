  import Item from '../Game/Item';

  export default class Picker extends Item {
  constructor(opts) {
    super({
      ...opts,
      name: 'picker',
      imageSrc: 'https://gw.alipayobjects.com/mdn/rms_b463f9/afts/img/A*fTJxQZYgVGAAAAAAAAAAAABkARQnAQ',
      isDragableX: true,
      isDragableY: false,
      isOverflowable: false,
      zIndex: 1
    });

    this.on('load', () => {
      this.move(this.layer.width / 2 - this.width / 2, this.stage.height - this.height - 85);
    });
  }
}

import Game from 'common/js/Game';
import Picker from 'common/js/factories/Picker';
import getItemConfigs from './getItemConfigs';

export default ({
  $container,
  onGameOver = () => {},
  onGameStart = () => {}
}) => {
  const game = new Game({
    $container
  });

  // 定时添加下落的箱子和炸弹
  let addBoxTimer;
  let itemConfigs;
  let stage;

  function addBox() {
    if (addBoxTimer) {
      return;
    }
    addBoxTimer = setInterval(() => {
      const itemConfig = itemConfigs.shift();
      if (!itemConfig) {
        clearInterval(addBoxTimer);
        return;
      }
      stage.addItem(itemConfig);
    }, 640);
  }

  game.on('start', () => {
    stage = game.addStage('defaultStage');
    game.switchToStage('defaultStage');

    // 添加小车
    stage.addItem({
      Constructor: Picker,
      width: 270 / 2,
      height: 118 / 2
    });

    // 添加盒子
    itemConfigs = getItemConfigs();
    addBox();
  });

  game.on('pause', () => {
    clearInterval(addBoxTimer);
  });

  game.on('restart', () => {
    addBox();
  });

  game.on('over', () => {
    // over之后还是留有渲染的机会
    clearInterval(addBoxTimer);
    addBoxTimer = null;

    // stop则停止渲染
    setTimeout(() => game.stop(), 1000);
  });

  game.on('stop', () => {
    game.reset();
  });

  return game;
}

const baseConfig = require('../webpack.base.config');
const path = require('path');

module.exports = {
  entry: {
    background: './src/background',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]-[hash:8].js'
  },
  ...baseConfig,
};

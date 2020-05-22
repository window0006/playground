const baseConfig = require('../webpack.base.config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  ...baseConfig,
  entry: {
    background: './src/background',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]-[hash:8].js'
  },
  plugins: [
    ...baseConfig.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'templates/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new FriendlyErrorsWebpackPlugin({
    //   clearConsole: true,
    // }),
  ]
};

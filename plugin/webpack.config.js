const baseConfig = require('../webpack.base.config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const distDir = path.join(__dirname, './dist');

module.exports = {
  ...baseConfig,
  resolve: {
    ...baseConfig.resolve,
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  },
  entry: {
    index: './src/index',
    background: './src/background',
  },
  output: {
    path: distDir,
    filename: '[name]-[hash:8].js',
    publicPath: 'http://localhost:9999/'
  },
  plugins: [
    ...baseConfig.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'plugin',
      template: 'templates/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new FriendlyErrorsWebpackPlugin({
    //   clearConsole: true,
    // }),
  ]
};

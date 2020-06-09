const baseConfig = require('../webpack.base.config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const distDir = path.join(__dirname, './dist');

module.exports = {
  ...baseConfig,
  entry: {
    index: './src/index',
  },
  output: {
    path: distDir,
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[hash:8].js',
    publicPath: 'http://localhost:9999/'
  },
  externals: {

  },
  resolve: {
    ...baseConfig.resolve,
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'src': path.join(__dirname, './src')
    }
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
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    runtimeChunk: {
      name: 'webpack.runtime'
    },
    splitChunks: {
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '-',
      cacheGroups: {
        defaultVendors: {
          chunks: 'all',
          name: 'react-libs',
          test: /[\\/]node_modules[\\/](react|@hot-loader[\\/]react-dom|react-router|react-router-dom)[\\/]/,
          reuseExistingChunk: true,
        }
      }
    }
  }
};

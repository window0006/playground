import baseConfig from '../webpack.base.config';
import fs from 'fs';
import path from 'path';

const config = {
  entry: {
    background: './src/index.ts',
  },
  output: {
    path: __dirname + '/dist',
    // publicPath: 'http://cdn.example.com/assets/', // cdn地址路径
    filename: '[name].[hash:8].js',
  },
};

export default {
  ...baseConfig,
  ...config,
};

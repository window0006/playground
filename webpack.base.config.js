const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV;

const jsxRule = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    rootMode: 'upward'
  }
};

const tsxRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    
  }, {
    loader: 'ts-loader',
    // 
    options: {
      transpileOnly: true, // 打包过程中不做类型检查，加速构建
      experimentalWatchApi: true, // 启用ts的watch mode API，减少每次迭代时重新构建的模块数量
    },
  }]
};
// for antd css 不能开启css modules 否则加载失败
const cssRule = {
  test: /\.css$/,
  use: [{
    loader: 'style-loader',
    options: {
      esModule: true,
    },
  }, {
    loader: 'css-loader',
    options: {
      importLoaders: true
    }
  }]
};

const lessRule = {
  test: /\.less$/,
  use: [{
    loader: 'style-loader',
    options: {
      esModule: true,
    },
  }, {
    loader: 'css-loader',
    options: {
      // modules: true
    }
  }, {
    loader: 'less-loader',
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  }]
};

const picRule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
      },
    },
  ]
};

const fontRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    {
      loader: 'file-loader',
    }
  ]
};

const config = {
  mode: env,
  module: {
    rules: [ tsxRule, jsxRule, cssRule, lessRule, picRule, fontRule ],
  },
  // 设置模块如何被解析
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    // ts-loader不再做类型检查了，使用这个插件，在单独的进程中与tslint一起做运行，做类型检查
    new ForkTsCheckerWebpackPlugin()
  ]
};

if (env === 'development') {
  const devConfig = {
    devtool: 'source-map-inline',
    devServer: require('./webpack.server.config')
  };
  Object.assign(config, devConfig);
}

module.exports = config;

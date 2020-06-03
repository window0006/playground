const env = process.env.NODE_ENV;

const jsxRule = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    rootMode: "upward"
  }
};

const tsxRule = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
  use: {
    loader: 'ts-loader'
  }
};

const cssRule = {
  test: /\.css$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      modules: true
    }
  }]
};

const lessRule = {
  test: /\.less$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      modules: true
    }
  }, {
    loader: 'less-loader'
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
    rules: [ jsxRule, tsxRule, cssRule, lessRule, picRule, fontRule ],
  },
  // 设置模块如何被解析
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: []
};

if (env === 'development') {
  const devConfig = {
    devtool: 'source-map',
    devServer: require('./webpack.server.config')
  };
  Object.assign(config, devConfig);
}

module.exports = config;

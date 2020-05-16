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

const fileRule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
      },
    },
  ]
}

const config = {
  mode: env,
  module: {
    rules: [ jsxRule, tsxRule, cssRule, lessRule, fileRule ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: []
};

if (env === 'development') {
  const devConfig = {
    mode: development,
    devtool: 'source-map',
    devServer: {
      port: 9999,
      compress: true, // gzip
      writeToDisk: true
    }
  };
  Object.assign(config, devConfig);
}

module.exports = config;
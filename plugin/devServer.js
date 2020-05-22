const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');
const devServerConfig = require('../webpack.server.config');

delete config.devServer;

webpackDevServer.addDevServerEntrypoints(config, devServerConfig);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, devServerConfig);

server.listen(9999, '0.0.0.0');

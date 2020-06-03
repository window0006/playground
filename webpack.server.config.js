module.exports = {
  https: false,
  contentBase: './dist',
  hot: true, // 热重载
  hotOnly:true,  // 修改hot为支持热更新
  port: 9999,
  compress: true, // gzip
  writeToDisk: true,
  overlay: false, // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
  noInfo: false, // 隐藏 webpack bundle 信息之类的消息
  open: false, // 在 server 启动后打开浏览器
  historyApiFallback: true, // 不存在path将fallback到/
  stats: {
    all: false, // 不在控制台输出全部信息，用下面的配置输出
    assets: false, // 输出构建的结果资源信息
    modules: false,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  }
};

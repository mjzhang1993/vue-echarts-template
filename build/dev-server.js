// 检查 node vue 版本
require('./check-versions')();

// 引入默认配置
const config = require('../config');

// 设置默认环境
if (!process.env.NODE_ENV) {
   process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

/*
   opn 插件可以强制打开浏览器跳转到指定页面
   介绍：https://github.com/sindresorhus/opn
*/
const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');

/*
   http-proxy-middleware 是一个 node 代理中间件，可以将http请求代理到其他服务器
   详情文档：https://github.com/chimurai/http-proxy-middleware
*/
const proxyMiddleware = require('http-proxy-middleware');

// 使用 dev 开发环境的配置
const webpackConfig = require('./webpack.dev.conf');

// 指定运行端口
const port = process.env.PORT || config.dev.port;

// 自动打开浏览器，默认 false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;

// 设置代理配置，格式参考 http-proxy-middleware 的文档
const proxyTable = config.dev.proxyTable;

// 使用 express 开启服务
const app = express();

/*
   webpack 函数传入一个配置对象 就会执行相应的编译
   可以传入第二个参数（回调函数）可以在这里处理错误信息
*/
const compiler = webpack(webpackConfig);

/*
   webpack-dev-middleware
   用来在内存中生成打包好的文件，而不用写到磁盘上，它提供从 webpack 到服务器的文件传输，用来配合进行热重载

   第一个参数：webpack 实例
   第二个参数：配置 只有 publicPath 必填，
   其他参考文档 https://www.npmjs.com/package/webpack-dev-middleware
*/
const devMiddleware = require('webpack-dev-middleware')(compiler, {
   /*
      在这里（'/config/index.js' dev.assetsPublicPath）设置 publicPath
      与 webpack-dev-server 异同，可以在这里查看 https://doc.webpack-china.org/configuration/dev-server/
   */
   publicPath: webpackConfig.output.publicPath,
   quiet: true
});
/*
   webpack-hot-middleware
   用来接受 webpack 传递来的更新，并将其反应到浏览器客户端，需要与 webpack-dev-middleware 一起使用

   使用文档：https://www.npmjs.com/package/webpack-hot-middleware
*/
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
   log: false,
   heartbeat: 2000
});

/*
   当 html-webpack-plugin 模板更新的时候强制刷新页面
   目前有BUG 所以禁用 BUG原因 https://github.com/jantimon/html-webpack-plugin/issues/680
*/
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

/*
   将代理的请求配置挂载到掐动的 express 服务上
   对应 webpack-dev-server 的 'proxy' 配置
*/
Object.keys(proxyTable).forEach(function(context) {
   let options = proxyTable[context];
   if (typeof options === 'string') {
      options = {
         target: options
      };
   }
   app.use(proxyMiddleware(options.filter || context, options));
});

/*
   使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
   对应 webpack-dev-server 'historyApiFallback: true' 配置
*/
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// 拼接 static 文件夹的静态资源路径
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'));

// 应用的地址信息
const ip = require('ip').address();

const uri = `http://${ip}:${port}`;

let _resolve;
let _reject;
let readyPromise = new Promise((resolve, reject) => {
   _resolve = resolve;
   _reject = reject;
});

let server;
let portfinder = require('portfinder');

portfinder.basePort = port;

console.log('> Starting dev server...');

// 直道打好的包有效后执行回调
devMiddleware.waitUntilValid(() => {
   /*
      portfinder 用于获取 port
   */
   portfinder.getPort((err, port) => {
      if (err) {
         _reject(err);
      }
      process.env.PORT = port;
      const uri = `http://${ip}:${port}`;
      console.log(`> Listening at ${uri}\n`);
      // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
         opn(uri);
      }
      server = app.listen(port, ip);
      //  server = app.listen(port, hostName) 可以在此加入主机名
      _resolve();
   });
});

module.exports = {
   ready: readyPromise,
   close: () => {
      server.close();
   }
};

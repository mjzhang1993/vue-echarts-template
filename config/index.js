// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const ip = require('ip').address();

// 配置 需要注入请求地址的文件
const defaultRequestPath = path.resolve(__dirname, '../src/api/request.js');

// 用来判断是否有 --report 参数，为了不打乱 vue-cli 默认配置，函数就定义在这里了
const shouldReport = function() {
   if (process.env.npm_config_report) {
      return process.env.npm_config_report;
   }

   return process.argv.some(item => item === '--report');
};

module.exports = {
   // 生产环境
   build: {
      env: require('./prod.env'),
      index: path.resolve(__dirname, '../dist/index.html'), // 页面入口
      assetsRoot: path.resolve(__dirname, '../dist'), // 静态资源路径，文件编译后输出路径
      assetsSubDirectory: 'static', // 二级路径、图片、音视频等媒体资源路径
      assetsPublicPath: '/', // 编译发布的根目录，最后会被写到 HTML 中，可以是服务器域名
      productionSourceMap: false, // 是否开启 SourceMap (css, js)
      // Gzip off by default as many popular static hosts such as
      // Surge or Netlify already gzip all static assets for you.
      // Before setting to `true`, make sure to:
      // npm install --save-dev compression-webpack-plugin
      productionGzip: false, // gzip 配置
      productionGzipExtensions: ['js', 'css'],
      // Run the build command with an extra argument to
      // View the bundle analyzer report after build finishes:
      // `npm run build --report`
      // Set to `true` or `false` to always turn it on or off
      bundleAnalyzerReport: shouldReport(), // 是否显示 report
      defaultRequestPath,
      // basicRequestHost: '/'
      basicRequestHost: `http://${ip}:3122`
   },
   // 开发环境
   dev: {
      env: require('./dev.env'),
      port: process.env.PORT || 8062, // 设置端口号
      autoOpenBrowser: true, // 是否默认打开浏览器
      assetsSubDirectory: 'static', // 二级路径、图片、音视频等媒体资源路径
      assetsPublicPath: '/', // 编译发布的根目录
      proxyTable: {
         // 代理的配置
         // 更多配置 https://github.com/chimurai/http-proxy-middleware
         '/text/*': {
            target: 'http://debug.xxx.com', // 要代理到的地址
            secure: false, // 是否验证 ssL 证书
            changeOrigin: true // 更改host header的origin到目标URL
         }
      },
      // CSS Sourcemaps off by default because relative paths are "buggy"
      // with this option, according to the CSS-Loader README
      // (https://github.com/webpack/css-loader#sourcemaps)
      // In our experience, they generally work as expected,
      // just be aware of this issue when enabling this option.
      cssSourceMap: false,
      defaultRequestPath,
      basicRequestHost: `http://${ip}:3122`
   }
};

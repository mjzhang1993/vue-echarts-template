const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
// copy-webpack-plugin 用于文件或者目录复制
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// optimize-css-assets-webpack-plugin 一个 css 优化插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
   module: {
      // 配置样式使用的 loader
      rules: utils.styleLoaders({
         sourceMap: config.build.productionSourceMap,
         extract: true
      })
   },
   devtool: config.build.productionSourceMap ? '#source-map' : false,
   output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
   },
   plugins: [
      // 定义环境变量
      new webpack.DefinePlugin({ 'process.env': env }),
      /*
         js 压缩
         UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
      */
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            warnings: false
         },
         sourceMap: true // 是否生成 sourceMap
      }),
      // css 文件分离
      new ExtractTextPlugin({
         filename: utils.assetsPath('css/[name].[contenthash].css')
      }),
      /*
         css 优化，css 复用
      */
      new OptimizeCSSPlugin({
         cssProcessorOptions: {
            safe: true
         }
      }),
      /*
         根据模板生成 HTML
         更多配置：https://www.npmjs.com/package/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
         filename: config.build.index,
         template: 'index.html',
         inject: true,
         // minify: {
         // 	removeComments: true,
         // 	collapseWhitespace: true,
         // 	removeAttributeQuotes: true
         // 	// more options:
         // 	// https://github.com/kangax/html-minifier#options-quick-reference
         // },
         minify: false,
         xhtml: true,
         chunksSortMode: 'dependency'
      }),
      /*
         HashedModuleIdsPlugin插件，
         它根据模块的相对路径生成一个长度只有四位的字符串作为模块的 id，
         所以只要我们不重命名一个模块文件，那么它的id就不会变，
         这样解决了某一个文件修改，其他文件的 hash随之改变的问题
      */
      new webpack.HashedModuleIdsPlugin(),
      // 抽离第三方代码
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks(module) {
            // 依赖的 node_modules 文件会被提取
            return (
               module.resource &&
               /\.js$/.test(module.resource) &&
               module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            );
         }
      }),
      // 提取运行时代码，避免每次打包后文件更改
      new webpack.optimize.CommonsChunkPlugin({
         name: 'manifest',
         chunks: ['vendor']
      }),
      // 复制静态资源
      new CopyWebpackPlugin([
         {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*'] // 忽略文件
         }
      ])
   ]
});

// 开启 gzip 的配置
if (config.build.productionGzip) {
   const CompressionWebpackPlugin = require('compression-webpack-plugin');

   webpackConfig.plugins.push(
      /*
         压缩
         更多配置：https://github.com/webpack-contrib/compression-webpack-plugin
      */
      new CompressionWebpackPlugin({
         asset: '[path].gz[query]',
         algorithm: 'gzip',
         test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
         threshold: 10240,
         minRatio: 0.8
      }));
}

if (config.build.bundleAnalyzerReport) {
   /*
      webpack-bundle-analyzer 插件
      解析出模块构成、以及各自的大小体积，最后显示为一个页面
      地址： https://www.npmjs.com/package/webpack-bundle-analyzer
   */
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

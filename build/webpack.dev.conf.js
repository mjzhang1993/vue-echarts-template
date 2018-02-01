
/*
   开发环境配置文件
*/
const utils = require('./utils'); // 工具文件
const webpack = require('webpack');
const config = require('../config'); // 引入配置
const merge = require('webpack-merge'); // webpack 配置合并
const baseWebpackConfig = require('./webpack.base.conf'); // 引入基础配置
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 根据模板生成 HTML
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

/*
   开发环境中，为了配合使用 热重载，需要在 入口前加入 './build/dev-client'（Hot-reload 的相对路径）
*/
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

// 合并开发环境配置到 基础配置上
module.exports = merge(baseWebpackConfig, {
   module: {
      /*
         这部分就是定义 style 样式需要用什么 loader 解析
      */
      rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
   },
   // cheap-module-eval-source-map is faster for development
   devtool: '#cheap-module-eval-source-map',
   plugins: [
      // 定义环境变量
      new webpack.DefinePlugin({ 'process.env': config.dev.env }),
      /*
         热重载需要插件
         地址：https://github.com/glenjamin/webpack-hot-middleware#installation--usage
      */
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      /*
         根据模板生成 HTML 的插件
         配置看这里：https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'index.html',
         inject: true
      }),
      new FriendlyErrorsPlugin()
   ]
});

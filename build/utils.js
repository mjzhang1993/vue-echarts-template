
const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 图片、音频、视频、字体等资源的路径配置
exports.assetsPath = function(_path) {
   const assetsSubDirectory =
      process.env.NODE_ENV === 'production'
         ? config.build.assetsSubDirectory
         : config.dev.assetsSubDirectory;

   return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
   options = options || {};

   // 一个基础的 cssLoader
   const cssLoader = {
      loader: 'css-loader',
      options: {
         minimize: process.env.NODE_ENV === 'production',
         sourceMap: options.sourceMap
      }
   };

   // 一个生成 loaders 的函数，只需传入 loader：类型，loaderOptions：loader 参数
   function generateLoaders(loader, loaderOptions) {
      /*
         loader：要加载的loader名
         loaderOptions：配置
      */
      const loaders = [cssLoader];
      if (loader) {
         loaders.push({
            loader: `${loader}-loader`,
            options: Object.assign({}, loaderOptions, { sourceMap: options.sourceMap })
         });
      }

      // 生产环境是，会指定提取 样式为单独文件
      if (options.extract) {
         return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
         });
      } 
         return ['vue-style-loader'].concat(loaders);
   }

   // https://vue-loader.vuejs.org/en/configurations/extract-css.html
   return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus')
   };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
   const output = [];
   // 引用上边的 cssLoaders，得到一个样式处理方案的对象，全部执行添加 loader
   const loaders = exports.cssLoaders(options);
   for (const extension in loaders) {
      const loader = loaders[extension];
      output.push({
         test: new RegExp(`\\.${extension}$`),
         use: loader
      });
   }
   return output;
};


const utils = require('./utils');
const config = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
   loaders: utils.cssLoaders({
      sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
      extract: isProduction // 表示是否提取样式为单独文件
   }),
   /*
      vue 中引入图片等媒体资源时，需要先 require('./images/xxx.png')
      这个配置可以将 对应的属性中的内容，装换为模块，这样就可以向正常的HTML 一样使用了
  */
   transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href'
   }
};

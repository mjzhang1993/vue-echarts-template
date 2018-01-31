// mock.js 配置假数据

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = function() {
   // 自定义扩展
   Random.extend({});

   const line = Mock.mock({
      'content|100-600': [
         ['@id', '@natural(50, 400)']
      ]
   }).content;

   const month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
   const bar = Mock.mock({
      'content|12': [
         ['@float(2, 249, 2, 2)', '@float(2, 249, 2, 2)', '@float(2, 24, 2, 2)']
      ]
   }).content;

   return {
      line,
      bar
   };
};

// mock.js 配置假数据

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = function () {
   // 自定义扩展
   Random.extend({});
   
   const line = Mock.mock({
      'content|100-600': [
         ['@id', '@natural(50, 400)']
      ]
   }).content;
   
   const bar = Mock.mock({
      'content|12': [
         ['@float(2, 249, 2, 2)', '@float(2, 249, 2, 2)', '@float(2, 24, 2, 2)']
      ]
   }).content;
   
   const pie = (function () {
      const categorys = [
         '直达',
         '邮件营销',
         '联盟广告',
         '视频广告',
         '百度',
         '谷歌',
         '必应',
         '其他'
      ];
      const allCounts = categorys.map(() => Random.natural(50, 400));
      const cate = categorys.map((name, idx) => ({name, value: allCounts[idx]}));
      const total = [
         {name: '直达', value: allCounts[0]},
         {name: '营销广告', value: add(allCounts.slice(1, 4))},
         {name: '搜索引擎', value: add(allCounts.slice(4))},
      ];
      
      function add (arr) {
         
         let count = 0;
         arr.forEach(i => count += +i);
         
         return count;
      }
      
      const nightingale = Mock.mock({
         'content|4-7': [{
            name: '@cname',
            value: '@natural(100, 250)'
         }]
      }).content;
      
      return {cate, total, nightingale};
   }());
   
   return {
      line,
      bar,
      pie
   };
};

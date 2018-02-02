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
   
   const scatter = (function () {
      const years = Random.range(1850, 2040, 10 );
      const oldCitys = Mock.mock({
         'content|20': ['@province']
      }).content;
      const citys = [...new Set(oldCitys)];
   
      const data = years.map(year => {
         return citys.map(city => {
            return [
               Random.natural(300, 20000),
               Random.float(10, 120, 0, 2),
               Random.natural(100000, 100000000),
               city
            ];
         });
      });
      
      return {timeRange: years, data};
   }());
   
   const radar = (function () {
      const provinces = Mock.mock({
         'content|3-8': ['@province']
      }).content;
      let data = [];
      
      [...new Set(provinces)].forEach(province => {
         data.push({
            province,
            data: Mock.mock({
               'content|20-50': [
                  [
                     '@natural(10, 150)',
                     '@natural(10, 200)',
                     '@natural(10, 200)',
                     '@float(0, 5, 2, 2)',
                     '@natural(10, 120)',
                     '@natural(0, 100)',
                     '@id'
                  ]
               ]
            }).content
         })
      });
      
      return data;
   }());
   
   
   
   const tree = (function () {
      const template = {
         name: '@name',
         value: '@natural(0, 10000)'
      };
      
      const data = Mock.mock({
         ...template,
         'children|2-4': [{
            ...template,
            'children|0-8': [{
               ...template,
               'children|0-10': [{
                  ...template
               }]
            }]
         }]
      });
      
      return data;
   }());
   
   return {
      line,
      bar,
      pie,
      scatter,
      radar,
      tree
   };
};

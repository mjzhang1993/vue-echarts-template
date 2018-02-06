// mock.js 配置假数据
const fs = require('fs');
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
                     '@float(0, 4, 2, 2)',
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
      
      return [data];
   }());
   
   const treemap = function (rootPath) {
      const getDirSize = function (children) {
         let size = 0;
         children.forEach(c => size += c.value);
         
         return size;
      };
      const ignoreDir = function (file, dirs) {
         return dirs.every(dir => file !== dir);
      };
      
      const readDIR = function readDIR(readPath) {
         const files = fs.readdirSync(readPath);
         const ignoreDirs = [
            'node_modules', '.DS_Store', '.vscode', '.idea', 'dist', '.git', 'yarn.lock'
         ];
         let children = [];
      
         files.forEach(file => {
            if (ignoreDir(file, ignoreDirs)) {
               const curPath = readPath + file;
               const stats = fs.statSync(curPath);
               let curData = {
                  name: file,
                  path: curPath,
                  value: stats.size
               };
               
               if (stats.isDirectory()) {
                  // 目录
                  curData.children = readDIR(curPath + '/');
                  curData.value = getDirSize(curData.children);
               }
         
               children.push(curData);
            }
         });
         
         return children;
      };
      
      const data = readDIR(rootPath || './');
      
      return data;
   };
   
   const sunburst = treemap('./src/');
   
   const boxplot = (function () {
      const getRange = function () {
         const start = Math.floor(Math.random()*200 + 10);
         const step = Math.floor(Math.random()*200 + 1);
         const end = start + step;
         
         return [start, end];
      };
      const getNum = function () {
         const range = getRange();
         const item = Mock.mock({
            'ct|30': [`@integer(${range[0]}, ${range[1]})`]
         }).ct;
         item.push(Math.floor(Math.random()*400));
         
         return item;
      };
      const len = Random.natural(5, 15);
      let data = [];
      
      for (let i = 0; i < len; i++) {
         data.push(getNum());
      }
      
      return data;
   }());
   
   const candlestick = (function () {
      // 做的假数据
      const getData = function (initial) {
         const start = initial - Math.floor(Math.random()*100);
         const end = initial + Math.floor(Math.random()*400);
         const basic = Mock.mock({
            'basic|30': [`@float(${start}, ${end}, 2, 2)`]
         }).basic;
         
         return basic;
      };
      const changeToDate = function (timestamp) {
         const current = new Date(+timestamp);
         const retVal = [
            current.getFullYear(),
            current.getMonth() + 1,
            current.getDate()
         ].join('-');
         
         return retVal;
      };
      const sortFun = (a, b) => a - b;
      const len = Random.natural(100, 300);
      const dateRange = 24 * 60 * 60 * 1000;
      let startTime = new Date(1990, 0, 1).getTime();
      let data = [];
      let last = 10234;
      
      for (let i = 0; i < len; i++) {
         const basic = getData(last);
         const open = basic[0];
         const close = basic[basic.length - 1];
         const computed = basic.sort(sortFun);
         const low = computed[computed.length - 1];
         const high = computed[0];
         const date = changeToDate(startTime);
         startTime = startTime + dateRange;
         last = computed[Math.floor(computed.length / 5)]; // 5 这个值是任意的
         data.push([date, open, close, low, high]);
      }
      
      return data;
   }());
   
   return {
      line,
      bar,
      pie,
      scatter,
      radar,
      tree,
      treemap: treemap(),
      sunburst,
      boxplot,
      candlestick
   };
};

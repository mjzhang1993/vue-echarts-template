<!-- ECharts -- Candlestick -- K线图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/component/legend';
   import 'echarts/lib/component/dataZoom';
   import 'echarts/lib/component/grid';
   import 'echarts/lib/chart/candlestick';
   import 'echarts/lib/chart/line';
   import 'echarts/map/js/china';
   import Chart from '../components/Charts/index';
   
   export default {
      name: 'echarts-candlestick',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', {currentData: 'candlestick'}),
         option() {
            return {
               /*
               * 箱型图，是一种用作显示一组数据分散情况的统计图
               * 图形由上到下一共五个值，依次为 最大值、Q3(上四分位数)、中位数、Q1(下四分位数)、最小值
               * 除此之外可以计算出异常值用散点图表示
               * */
               title: {
                  text: 'K线图',
                  left: 'left'
               },
               tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                     type: 'cross'
                  }
               },
               legend: {
                  data: ['K线', 'MA5', 'MA10', 'MA20', 'MA30']
               },
               grid: {
                  left: '10%',
                  right: '10%',
                  bottom: '15%'
               },
               dataZoom: [
                  {
                     type: 'inside',
                     start: 0,
                     end: 50
                  },
                  {
                     show: true,
                     type: 'slider',
                     y: '90%',
                     start: 0,
                     end: 50
                  }
               ],
               dataset: [
                  { source: this.currentData },
                  // { source: this.calculateMA(5)},
                  // { source: this.calculateMA(10)},
                  // { source: this.calculateMA(20)},
                  // { source: this.calculateMA(30)},
               ],
               xAxis: {
                  type: 'category',
                  scale: true,
                  boundaryGap: false,
                  axisLine: {onZero: false},
                  splitLine: {show: false},
                  splitNumber: 20,
                  min: 'dataMin',
                  max: 'dataMax'
               },
               yAxis: {
                  scale: true,
                  splitArea: {
                     show: true
                  }
               },
               series: [
                  {
                     name: 'K线',
                     type: 'candlestick',
                     itemStyle: { // k线图的图形样式
                        color: '#c23531', // 阳线
                        color0: '#314656', // 阴线
                        borderColor: '#c23531', // 阳线描边
                        borderColor0: '#314656', // 阴线描边
                        opacity: 0.5,
                     },
                     markPoint: { // 图表标注
                        label: { // 标注文本
                           formatter(param) {
                              return param != null ? Math.round(param.value) : '';
                           }
                        },
                        data: [ // 标注的数据数组
                           {
                              name: '最大值',
                              type: 'max',
                              valueDim: 'close' // 指定比较最大值的维度 [open, close, lowest, highest]
                           },
                           {
                              name: '最小值',
                              type: 'min',
                              valueDim: 'close'
                           },
                           {
                              name: '平均值',
                              type: 'average',
                              valueDim: 'close'
                           }
                        ],
                     },
                     encode: {
                        x: 0,
                        y: [1, 2, 3, 4]
                     }
                  },
                  {
                     name: 'MA5',
                     type: 'line',
                     smooth: true,
                     data: this.calculateMA(5),
                     lineStyle: {
                        opacity: 0.5
                     }
                  },
                  {
                     name: 'MA10',
                     type: 'line',
                     smooth: true,
                     data: this.calculateMA(10),
                     lineStyle: {
                        opacity: 0.5
                     }
                  },
                  {
                     name: 'MA20',
                     type: 'line',
                     smooth: true,
                     data: this.calculateMA(20),
                     lineStyle: {
                        opacity: 0.5
                     }
                  },
                  {
                     name: 'MA30',
                     type: 'line',
                     smooth: true,
                     data: this.calculateMA(30),
                     lineStyle: {
                        opacity: 0.5
                     }
                  }
               ]
            };
         }
      },
      methods: {
         ...mapActions('charts', ['changeData']),
         calculateMA(dayCount) {
            // 日均线计算
            let result = [];
            const currentData = this.currentData;
            for (let i = 0; i < currentData.length; i++) {
               if (i < dayCount) {
                  result.push('-');
               } else {
                  let sum = 0;
   
                  for (let j = 0; j < dayCount; j++) {
                     sum += currentData[i - j][2];
                  }
                  result.push(sum / dayCount);
               }
            }
            return result;
         }
      },
      async beforeMount() {
         console.log(this.$route);
         const path = '/candlestick';
         const key = 'candlestick';
         
         await this.changeData({ path, key });
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
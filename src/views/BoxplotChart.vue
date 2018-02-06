<!-- ECharts -- Boxplot -- 箱型图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/component/grid';
   import 'echarts/lib/chart/boxplot';
   import 'echarts/map/js/china';
   import prepareBoxplotData from 'echarts/extension/dataTool/prepareBoxplotData'; // echarts 提供的工具函数
   import Chart from '../components/Charts/index';
   
   export default {
      name: 'echarts-boxplot',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', {currentData: 'boxplot'}),
         computedData() {
            return prepareBoxplotData(this.currentData);
         },
         option() {
            return {
               /*
               * 箱型图，是一种用作显示一组数据分散情况的统计图
               * 图形由上到下一共五个值，依次为 最大值、Q3(上四分位数)、中位数、Q1(下四分位数)、最小值
               * 除此之外可以计算出异常值用散点图表示
               * */
               title: [
                  {
                     text: '箱型图',
                     left: 'center'
                  },
                  {
                     text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                     borderColor: '#999',
                     borderWidth: 1,
                     textStyle: {
                        fontSize: 14
                     },
                     left: '10%',
                     top: '90%'
                  }
               ],
               tooltip: {
                  trigger: 'item',
                  axisPointer: {
                     type: 'shadow'
                  },
                  formatter(param) {
                     return [
                        `Experiment ${param.name}:`,
                        `upper: ${param.data[5]}`,
                        `Q3: ${param.data[4]}`,
                        `median: ${param.data[3]}`,
                        `Q1: ${param.data[2]}`,
                        `lower: ${param.data[1]}`
                     ].join('<br/>');
                  }
               },
               grid: {
                  left: '10%',
                  right: '10%',
                  bottom: '15%'
               },
               xAxis: {
                  type: 'category',
                  coordinateSystem: 'cartesian2d', // 系列使用的坐标系
                  data: this.computedData.axisData,
                  boundaryGap: true,
                  nameGap: 30,
                  splitArea: {
                     show: false
                  },
                  axisLabel: {
                     formatter: 'expr {value}'
                  },
                  splitLine: {
                     show: false
                  }
               },
               yAxis: {
                  type: 'value',
                  name: 'km/s minus 299,000',
                  splitArea: {
                     show: true
                  }
               },
               series: [
                  {
                     name: 'boxplot',
                     type: 'boxplot',
                     data: this.computedData.boxData,
                  },
                  {
                     name: 'outlier',
                     type: 'scatter',
                     data: this.computedData.outliers
                  }
               ]
            };
         }
      },
      methods: {
         ...mapActions('charts', ['changeData'])
      },
      async beforeMount() {
         const path = '/boxplot';
         const key = 'boxplot';
         
         await this.changeData({ path, key });
         console.log(this.computedData);
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
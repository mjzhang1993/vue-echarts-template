<!-- ECharts -- Line -- 折线图、面积图  -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';
import 'echarts/map/js/china';
import Chart from '../components/Charts/index';

export default {
   name: 'echarts-line',
   data() {
      return { renderer: 'canvas' };
   },
   computed: {
      ...mapState('charts', { currentData: 'line' }),
      option() {
         return {
            title: { text: 'Beijing AQI', subtext: '模拟数据' },
            tooltip: {
               trigger: 'axis',
               axisPointer: { type: 'cross', axis: 'y', snap: true },
            },
            dataset: {
               // 提供一份数据。
               source: this.currentData,
            },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: { type: 'category' },
            // 声明一个 Y 轴，数值轴。
            yAxis: { splitLine: { show: false } },
            toolbox: {
               left: 'center',
               feature: {
                  saveAsImage: {},
                  restore: {},
                  magicType: { type: ['line', 'bar'] },
               },
            },
            dataZoom: [
               { type: 'slider', start: 0, end: 10 },
               { type: 'inside', start: 0, end: 10 },
            ],
            visualMap: {
               type: 'continuous',
               min: 0,
               max: 400,
               range: [0, 400],
               calculable: true,
               inRange: { color: ['#ffde33', '#cc0033', '#660099'] },
               outOfRange: { color: '#999' },
            },
            // 声明多个系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [
               {
                  type: 'line',
                  name: 'Beijing AQI',
                  coordinateSystem: 'cartesian2d', // cartesian2d|polar 指定所使用的坐标系
                  xAxisIndex: 0, // 使用的x轴的 index
                  yAxisIndex: 0, // 使用的y轴的 index
                  symbol: 'pin', // 标记的图形
                  symbolSize: 35, // 标记大小
                  showAllSymbol: true, // 显示所有标记
                  hoverAnimation: true, // 划过动画
                  connectNulls: true, // 链接空数据
                  clipOverflow: true, // 超出部分剪裁
                  step: false, // 设置为阶梯状的线图
                  smooth: true, // 平滑曲线
                  smoothMonotone: true, // 折线平滑后是否在一个维度上保持单调性
                  sampling: 'average', // 过滤数据点
                  // dimensions: ['AQI'], // 定义维度信息
                  label: {
                     // 图形上文本标签
                     show: true,
                     position: 'insideTop',
                     fontSize: 10,
                  },
                  encode: {
                     // 可以定义 data 的哪个维度被编码成什么
                     x: 0,
                     y: 1,
                     tooltip: [0, 1],
                  },
                  seriesLayoutBy: 'column', // 将行或者列对应为系列
                  datasetIndex: 0, // 指定使用哪个 dataset
                  markPoint: {
                     // 标记的图形
                     symbol: 'arrow',
                     symbolSize: 30,
                     data: [{ name: '最大值', type: 'max' }],
                  },
                  markLine: {
                     // 图表标线
                     symbol: [undefined, 'arrow'],
                     precision: 0, // 精度
                     label: {
                        position: 'start',
                     },
                     data: [
                        {
                           yAxis: 50,
                        },
                        {
                           yAxis: 100,
                        },
                        {
                           yAxis: 150,
                        },
                        {
                           yAxis: 200,
                        },
                        {
                           yAxis: 300,
                        },
                     ],
                  },
                  markArea: {},
                  areaStyle: { // 区域填充样式
                     color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                           offset: 0, color: '#ffde33' // 0% 处的颜色
                        }, {
                           offset: 1, color: '#660099' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                     }
                  }
               },
            ],
         };
      },
   },
   methods: {
      ...mapActions('charts', ['changeData']),
   },
   async beforeMount() {
      const path = '/line';
      const key = 'line';

      await this.changeData({ path, key });
   },
   components: { Chart },
};
</script>

<style lang="scss" scoped>
@import '../scss/_common.scss';
</style>

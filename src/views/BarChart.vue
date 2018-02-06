<!-- ECharts -- Bar -- 柱形图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/map/js/china';
import Chart from '../components/Charts/index';

export default {
   name: 'echarts-bar',
   data() {
      return {
         renderer: 'canvas',
         month: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
         ],
      };
   },
   computed: {
      ...mapState('charts', { currentData: 'bar' }),
      option() {
         return {
            title: { text: '遮住混合', subtext: '可切换堆叠' },
            tooltip: {
               trigger: 'axis',
               axisPointer: { type: 'cross', snap: true },
            },
            dataset: {
               // 提供一份数据。
               source: this.currentData.map((cur, idx) =>
                  [this.month[idx]].concat(cur),
               ),
            },
            legend: {
               left: 'right',
               top: 'top',
               data: ['蒸发量', '降水量', '温度'],
            },
            // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
            xAxis: [
               {
                  type: 'category',
                  axisPointer: {
                     type: 'shadow',
                  },
               },
            ],
            // 声明一个 Y 轴，数值轴。
            yAxis: [
               {
                  type: 'value',
                  name: '水量',
                  min: 0,
                  max: 500,
                  interval: 50,
                  axisLabel: {
                     formatter: '{value} ml',
                  },
               },
               {
                  type: 'value',
                  name: '温度',
                  min: 0,
                  max: 25,
                  interval: 5,
                  axisLabel: {
                     formatter: '{value} °C',
                  },
               },
            ],
            toolbox: {
               left: 'center',
               feature: {
                  saveAsImage: {},
                  restore: {},
                  magicType: {
                     type: ['bar', 'line', 'stack', 'tiled'],
                     seriesIndex: {
                        stack: [0, 1],
                        tiled: [0, 1],
                     },
                  },
               },
            },
            // 声明多个系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
            series: [
               {
                  type: 'bar',
                  name: '降水量',
                  legendHoverLink: true, // 启动图例 hover 时的联动高亮
                  coordinateSystem: 'cartesian2d', // 指定使用的坐标系
                  xAxisIndex: 0, // 使用的 x 轴
                  yAxisIndex: 0, // 使用的 y 轴
                  label: {
                     show: true,
                     position: 'insideBottom',
                     rotate: 30,
                  },
                  // stack: 'water', // 堆叠，将需要堆叠的设置同一个名称即可
                  encode: {
                     // 定义映射的维度
                     x: 0,
                     y: 1,
                  },
               },
               {
                  type: 'bar',
                  name: '蒸发量',
                  // stack: 'water',
                  encode: {
                     x: 0,
                     y: 2,
                  },
               },
               {
                  type: 'line',
                  name: '温度',
                  yAxisIndex: 1,
                  encode: {
                     x: 0,
                     y: 3,
                  },
               },
            ],
         };
      },
   },
   methods: {
      ...mapActions('charts', ['changeData']),
   },
   async beforeMount() {
      const path = '/bar';
      const key = 'bar';

      await this.changeData({ path, key });
   },
   components: { Chart },
};
</script>

<style lang="scss" scoped>
@import '../scss/_common.scss';
</style>

<!-- ECharts -- Candlestick -- K线图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/component/grid';
   import 'echarts/lib/chart/candlestick';
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
               
            };
         }
      },
      methods: {
         ...mapActions('charts', ['changeData'])
      },
      async beforeMount() {
         const path = '/candlestick';
         const key = 'candlestick';
         
         await this.changeData({ path, key });
         console.log(this.computedData);
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
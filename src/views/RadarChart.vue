<!-- ECharts -- Radar -- 雷达图  -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/component/grid';
   import 'echarts/lib/component/legend';
   import 'echarts/lib/chart/radar';
   import 'echarts/map/js/china';
   import Chart from '../components/Charts/index';

   const colors = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
   
   export default {
      name: 'echarts-radar',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', { currentData: 'radar' }),
         provinces() {
            const currentData = this.currentData || [];
            
            return currentData.map(data => data.province);
         },
         option() {
            return {
               backgroundColor: '#161627',
               title: {
                  text: 'AQI - 雷达图',
                  left: 'center',
                  textStyle: {
                     color: '#eee'
                  }
               },
               legend: {
                  bottom: 5,
                  data: this.provinces,
                  itemGap: 20,
                  textStyle: {
                     color: '#fff',
                     fontSize: 14
                  },
                  selectedMode: 'single'
               },
               radar: {
                  indicator: [ // 雷达图指示器
                     {name: 'AQI', max: 200},
                     {name: 'PM2.5', max: 250},
                     {name: 'PM10', max: 250},
                     {name: 'CO', max: 5},
                     {name: 'NO2', max: 150},
                     {name: 'SO2', max: 120}
                  ],
                  shape: 'circle', // 形状
                  splitNumber: 5, // 分割段数
                  splitLine: { // 分隔线
                     lineStyle: {
                        color: [
                           'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                           'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                           'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                     }
                  },
                  splitArea: { // 分割区域
                     show: false
                  },
                  axisLine: { // 坐标轴轴线
                     lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                     }
                  }
               },
               series: this.provinces.map((province, idx) => {
                  return {
                     name: province,
                     type: 'radar',
                     lineStyle: {
                        width: 1,
                        opacity: 0.5
                     },
                     data: this.currentData[idx].data,
                     symbol: 'none',
                     itemStyle: {
                        color: colors[idx % colors.length]
                     },
                     areaStyle: {
                        opacity: 0.05
                     }
                  }
               })
            };
         },
      },
      methods: {
         ...mapActions('charts', ['changeData']),
      },
      async beforeMount() {
         const path = '/radar';
         const key = 'radar';
         
         await this.changeData({ path, key });
      },
      components: { Chart },
   };
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>

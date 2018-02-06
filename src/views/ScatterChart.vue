<!-- ECharts -- Scatter -- 散点图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/component/grid';
   import 'echarts/lib/component/visualMap';
   import 'echarts/lib/component/timeline';
   import 'echarts/lib/chart/scatter';
   import 'echarts/lib/chart/effectScatter';
   import 'echarts/map/js/china';
   import Chart from '../components/Charts/index';

   const colors = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
   const itemStyle = {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
   };
   console.log(colors);
   
   export default {
      name: 'echarts-scatter',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', {currentData: 'scatter'}),
         defaultData() {
            const allData = this.allData || [];
            
            return allData[0] || [];
         },
         allData() {
            const currentData = this.currentData || {};
            const data = currentData.data || [];
            
            return data;
         },
         option() {
            return {
               baseOption: {
                  backgroundColor: '#404a59',
                  timeline: {
                     show: true,
                     axisType: 'category',
                     orient: 'vertical',
                     autoPlay: true,
                     inverse: true,
                     left: null,
                     right: 0,
                     top: 20,
                     bottom: 100,
                     width: 55,
                     height: null,
                     label: {
                        color: '#999'
                     },
                     symbol: 'none',
                     lineStyle: {
                        color: '#555'
                     },
                     checkpointStyle: {
                        color: '#bbb',
                        borderColor: '#777',
                        borderWidth: 2
                     },
                     controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        color: '#666',
                        borderColor: '#666'
                     },
                     emphasis: {
                        label: {
                           color: '#fff'
                        },
                        controlStyle: {
                           color: '#aaa',
                           borderColor: '#aaa'
                        }
                     },
                     data: this.currentData.timeRange
                  },
                  title: [
                     {
                        text: '各省人均寿命与GDP关系演变',
                        left: 'center',
                        top: 10,
                        textStyle: {
                           color: '#aaa',
                           fontWeight: 'normal',
                           fontSize: 20
                        }
                     }
                  ],
                  visualMap: [
                     {
                        show: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: 20,
                        dimension: 3,
                        categories: this.defaultData.map(cityData => cityData[3]),
                        calculable: true,
                        precision: 0.1,
                        textGap: 30,
                        textStyle: {
                           color: '#ccc'
                        },
                        inRange: {
                           color: colors.concat(colors)
                        }
                     }
                  ],
                  tooltip: {
                     padding: 5,
                     backgroundColor: '#222',
                     borderColor: '#777',
                     borderWidth: 1,
                     axisPointer: {
                        type: 'cross'
                     }
                  },
                  grid: {
                     containLabel: true,
                     left: 30,
                     top: 100,
                     right: 110,
                     bottom: 100,
                  },
                  xAxis: {
                     type: 'log',
                     name: '人均收入',
                     max: 100000,
                     min: 300,
                     nameGap: 25,
                     nameLocation: 'middle',
                     nameTextStyle: {
                        fontSize: 18
                     },
                     splitLine: {
                        show: false
                     },
                     axisLine: {
                        lineStyle: {
                           color: '#ccc'
                        }
                     },
                     axisLabel: {
                        formatter: '{value} $'
                     }
                  },
                  yAxis: {
                     type: 'value',
                     name: '平均寿命',
                     max: 120,
                     nameTextStyle: {
                        color: '#ccc',
                        fontSize: 18
                     },
                     axisLine: {
                        lineStyle: {
                           color: '#ccc'
                        }
                     },
                     splitLine: {
                        show: false
                     },
                     axisLabel: {
                        formatter: '{value} 岁'
                     }
                  },
                  dataset: {
                     source: this.defaultData,
                     dimensions: ['人均收入', '平均寿命', '总人口', '城市']
                  },
                  series: [
                     {
                        type: 'scatter',
                        name: '各省人均寿命与GDP关系演变',
                        itemStyle,
                        symbolSize: value => (Math.sqrt(value[2] / 5e8) + 0.1) * 80,
                        encode: {
                           x: 0,
                           y: 1,
                           tooltip: [0, 1, 2, 3],
                        }
                     },
                     // {
                     //    type: 'effectScatter', // 配置项与 scatter 类似，只是含有动画效果
                     //    name: '各省人均寿命与GDP关系演变-重点',
                     //    itemStyle,
                     //    symbolSize: value => (Math.sqrt(value[2] / 5e8) + 0.1) * 80,
                     //    encode: {
                     //       x: 0,
                     //       y: 1,
                     //       tooltip: [0, 1, 2, 3],
                     //    }
                     // }
                  ],
               },
               options: this.allData.map(d => {
                  return {
                     dataset: {
                        source: d,
                        dimensions: ['人均收入', '平均寿命', '总人口', '城市']
                     },
                  };
               })
            };
         }
      },
      methods: {
         ...mapActions('charts', ['changeData'])
      },
      async beforeMount() {
         const path = '/scatter';
         const key = 'scatter';
         
         await this.changeData({ path, key });
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
<!-- ECharts -- Sunburst -- 旭日图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/visualMap';
   import 'echarts/lib/component/title';
   import 'echarts/lib/chart/sunburst';
   import 'echarts/lib/chart/line';
   import 'echarts/map/js/china';
   import Chart from '../components/Charts/index';
   
   export default {
      name: 'echarts-sunburst',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', {currentData: 'sunburst'}),
         option() {
            return {
               backgroundColor: '#2E2733',
               title: {
                  text: '旭日图'
               },
               visualMap: {
                  type: 'continuous',
                  min: 0,
                  max: 10000,
                  inRange: {
                     color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
                  }
               },
               series: [
                  {
                     type: 'sunburst',
                     center: ['50%', '50%'], // 中心点位置
                     radius: [0, '90%'], // 内外半径大小
                     /*
                     * data 格式与 tree treemap 类似
                     * [{name: 'xxx', value: 111, children: [...]}]
                     * */
                     data: this.currentData,
                     label: { // 描述每个扇形块文本样式
                        rotate: 'radial' // 旋转 radial 径向旋转
                     },
                     nodeClick: 'rootToNode', // 点击节点后行为
                     sort: 'asc', // 排序方式
                     renderLabelForZeroData: true, // 数据没有name 属性是否需要渲染文字
                     levels: [ // 旭日图每一层的特殊配置
                        {}, // 第一个元素为空白，表示元素下钻的空白配置
                     ]
                  }
               ]
            };
         }
      },
      methods: {
         ...mapActions('charts', ['changeData'])
      },
      async beforeMount() {
         const path = '/sunburst';
         const key = 'sunburst';
         
         await this.changeData({ path, key });
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
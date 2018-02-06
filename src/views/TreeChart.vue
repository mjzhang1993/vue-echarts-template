<!-- ECharts -- Tree -- 树型图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/chart/tree';
   import 'echarts/lib/chart/line';
   import 'echarts/map/js/china';
   import Chart from '../components/Charts/index';
   
   export default {
      name: 'echarts-tree',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', {currentData: 'tree'}),
         option() {
            return {
               title: {
                  text: '树形图'
               },
               tooltip: {
                  rigger: 'item',
                  triggerOn: 'mousemove'
               },
               series: [
                  /*
                  * 主要是数据结构要为 {name: '', value: '', children: []} 的格式
                  * */
                  {
                     type: 'tree',
                     name: 'tree',
                     layout: 'orthogonal', // 布局类型
                     orient: 'horizontal', // 方向
                     expandAndCollapse: true, // 子树的折叠和展开交互
                     initialTreeDepth: 3, // 初始展开层级
                     data: this.currentData
                  }
               ]
            };
         }
      },
      methods: {
         ...mapActions('charts', ['changeData'])
      },
      async beforeMount() {
         const path = '/tree';
         const key = 'tree';
         
         await this.changeData({ path, key });
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
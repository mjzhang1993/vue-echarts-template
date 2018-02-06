<!-- ECharts -- TreeMap -- 面积树图 -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
   import { mapActions, mapState } from 'vuex';
   import 'echarts/lib/component/tooltip';
   import 'echarts/lib/component/title';
   import 'echarts/lib/chart/treemap';
   import 'echarts/map/js/china';
   import Chart from '../components/Charts/index';
   
   export default {
      name: 'echarts-treemap',
      data() {
         return { renderer: 'canvas' };
      },
      computed: {
         ...mapState('charts', {currentData: 'treemap'}),
         option() {
            return {
               // treemap 首先是将数值映射到 面积这种视觉元素上
               title: {
                  text: '当前项目文件大小',
                  left: 'center'
               },
               tooltip: {},
               series: [
                  {
                     name: '当前项目文件大小',
                     type: 'treemap',
                     width: '90%',
                     height: '90%',
                     leafDepth: 2, // 开启下钻，需要点击后才会显示下层级，
                     drillDownIcon: '>>>', // 下钻的图标
                     squareRatio: 1.5, // 期望矩形长宽比率。布局计算时会尽量向这个比率靠近
                     roam: true, // 设置拖拽和平移
                     nodeClick: 'zoomToNode', // 点击节点后的行为 如果有 link 属性可以跳转
                     zoomToNodeRatio: 0.32 * 0.32, // 设置点击后节点放大的比例
                     visibleMin: 300,
                     label: {
                        show: true,
                        formatter: '{b}'
                     },
                     upperLabel: {
                        normal: {
                           show: true,
                           height: 30
                        }
                     },
                     itemStyle: {
                        normal: {
                           borderColor: '#fff'
                        }
                     },
                     levels: [ // 设置每个层级的配置
                        {
                           // 定义映射的视觉维度，每个节点的 value 属性值可以是数组，这里用来定义数组哪个维度映射为面积
                           visualDimension: 0,
                           visualMin: null, // 当前层级的最小 value值，不设置自动统计
                           visualMax: null,
                           visibleMin: 10, // 最小面积 10 * 10 小于这个不显示
                           childrenVisibleMin: null, // 小于这个数值则子节点不显示
                           label: {}, // 矩形中文本标签样式
                           itemStyle: {
                              borderColor: '#777',
                              borderWidth: 0,
                              gapWidth: 1
                           },
                           upperLabel: { // 显示矩形父节点的标签
                              show: true,
                           }
                        },
                        {
                           itemStyle: {
                              borderColor: '#555',
                              borderWidth: 5,
                              gapWidth: 1,
                           },
                           emphasis: {
                              itemStyle: {
                                 borderColor: '#ddd'
                              }
                           }
                        },
                        {
                           colorSaturation: [0.35, 0.5],
                           itemStyle: {
                              borderWidth: 5,
                              gapWidth: 1,
                              borderColorSaturation: 0.6
                           }
                        }
                     ],
                     breadcrumb: { // 面包屑导航，能够显示当前节点的路径。
                        show: true
                     },
                     /*
                     * 数据结构：
                     * [
                     *  {value: 111, name: 'xxx', children: [{...}]}
                     * ]
                     * */
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
         const path = '/treemap';
         const key = 'treemap';
         
         await this.changeData({ path, key });
      },
      components: { Chart },
   }
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
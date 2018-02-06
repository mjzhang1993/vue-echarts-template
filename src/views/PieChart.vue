<!-- ECharts -- Pie -- 饼图  -->
<template>
   <Chart :renderer="renderer" :option="option"/>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/chart/pie';
import 'echarts/map/js/china';
import Chart from '../components/Charts/index';

export default {
   name: 'echarts-pie',
   data() {
      return { renderer: 'canvas' };
   },
   computed: {
      ...mapState('charts', {currentData: 'pie'}),
      option() {
         return {
            tooltip: {},
            legend: [
               {
                  orient: 'vertical',
                  left: 'left',
                  data: this.allNames(['total', 'cate'])
               },
               {
                  orient: 'vertical',
                  left: 'right',
                  top: 'bottom',
                  data: this.allNames(['nightingale'])
               }
            ],
            series: [
               {
                  name: '访问来源',
                  type: 'pie',
                  selectedMode: 'single', // 选中模式，可设置为多选
                  clockwise: true, // 是否是顺时针排布
                  startAngle: 90, // 起始角度
                  minAngle: 0, // 最小扇区角度，避免影响交互
                  roseType: false, // 展示成南丁格尔图
                  avoidLabelOverlap: true, // 避免标签重叠
                  center: ['50%', '30%'], // 圆心位置
                  radius: [0, '30%'], // 半径设置
                  label: {
                     position: 'inner'
                  },
                  labelLine: {
                     show: false
                  },
                  data: this.currentData.total
               },
               {
                  name: '访问来源',
                  type: 'pie',
                  center: ['50%', '30%'],
                  radius: ['40%', '55%'],
                  label: {
                     show: true,
                     formatter: '{title|{a}}\n{hr|}\n{name|{b}:} {c} {per|{d}%}', // 使用格式器数据
                     backgroundColor: '#eee',
                     borderColor: '#aaa',
                     borderWidth: 1,
                     borderRadius: 4,
                     padding: 5,
                     rich: { // 自定义富文本
                        title: { // 标题
                           color: '#999',
                           lineHeight: 22,
                           align: 'center'
                        },
                        hr: { // 分割线
                           width: '100%',
                           height: 0,
                           borderColor: '#aaa',
                           borderWidth: 0.5
                        },
                        name: { // 数据名
                           fontSize: 14,
                           lineHeight: 33
                        },
                        per: { // 占比
                           color: '#eee',
                           backgroundColor: '#334455',
                           padding: [2, 4],
                           borderRadius: 2
                        }
                     }
                  },
                  data: this.currentData.cate
               },
               {
                  name: '人员销量',
                  type: 'pie',
                  radius: ['5%', '40%'],
                  center: ['40%', '80%'],
                  data: this.currentData.nightingale,
                  roseType: 'radius'
               }
            ]
         };
      }
   },
   methods: {
      ...mapActions('charts', ['changeData']),
      allNames(keys) {
         let names = [];
         keys.forEach(key => {
            const dataList = this.currentData[key] || [];
            const currentNames = dataList.map(data => data.name);
         
            names.push(...currentNames);
         });
      
         return [...new Set(names)];
      },
   },
   async beforeMount() {
      const path = '/pie';
      const key = 'pie';
      
      await this.changeData({ path, key });
   },
   components: { Chart },
}
</script>

<style lang="scss" scoped>
   @import '../scss/_common.scss';
</style>
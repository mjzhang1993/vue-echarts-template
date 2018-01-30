<template>
<div class="basic-container">
	<header class="header">
		this is Vue-ECharts-Template
	</header>
	<div class="main">
		<SideBar class="main-sidebar"/>
		<div class="main-charts-content">
			<header class="main-header">
				<p>{{title}}</p>
			</header>
			<div class="charts">
				<Chart :options="{option}"/>
				<!-- <router-view></router-view> -->
			</div>
		</div>
	</div>
</div>
</template>

<script>
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/map/js/china';

// 引入图形
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import SideBar from '../components/Basic/SideBar';
import Chart from '../components/Charts/index';

export default {
   name: 'basic',
   data() {
      return {
         isOpen: true,
         title: 'this is title'
      };
   },
   computed: {
      option() {
         return {
            title: {
               top: 30,
               left: 'center',
               text: '2018 每天步数'
            },
            tooltip: {},
            grid: {
               left: '3%',
               right: '4%',
               bottom: '3%',
               containLabel: true
            },
            xAxis: [
               {
                  type: 'category'
               }
            ],
            yAxis: {},
            dataset: {
               source: [
                  ['Matcha Latte', 43.3, 85.8, 93.7],
                  ['Milk Tea', 83.1, 73.4, 55.1],
                  ['Cheese Cocoa', 86.4, 65.2, 82.5],
                  ['Walnut Brownie', 72.4, 53.9, 39.1]
               ],
               dimensions: ['product', '2015', '2016', '2017'], // 维度信息
               sourceHeader: null // 第一行是否是维度信息
            },
            series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
         };
      }
   },
   components: { SideBar, Chart }
};
</script>

<style lang="scss" scoped>
@import '../scss/_common.scss';

.basic-container {
   @include pa;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   overflow: hidden;
}
.header {
   width: calc(100% - 20px);
   height: 60px;
   @include flexh;
   font-size: 30px;
   margin: 0px 10px;
}
.main {
   flex-grow: 1;
   width: 100%;
   height: 0;
   display: flex;
   justify-content: flex-start;
   align-items: flex-start;
   position: relative;
}
.main-sidebar {
   width: 150px;
   height: 100%;
}
.main-charts-content {
   width: 0;
   flex-grow: 1;
   height: 100%;
   @include flexv;
   .charts {
      width: 100%;
      height: 0;
      flex-grow: 1;
   }
}
.main-header {
   width: 100%;
   height: 50px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   border-bottom: 1px solid #666;
   border-top: 1px solid #666;
   p {
      width: 0;
      flex-grow: 1;
      height: 100%;
      margin: 0;
      padding: 0;
      @include flexh;
      font-size: 24px;
   }
   button {
      @include flexh;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      outline: none;
      margin-left: 10px;
      font-size: 24px;
      color: #666;
      line-height: 0;
      transform: rotate(180deg);
      transition: all 0.1s ease-in-out;
   }
   .close {
      transform: rotate(0deg);
   }
}
</style>

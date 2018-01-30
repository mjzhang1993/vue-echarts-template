<template>  
   <div 
      class="default-chart"
      :style="{width, height}"
   >
   </div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import 'zrender/lib/svg/svg';
// 引入提示框和标题组件

import throttle from '../../utils/throttle';

export default {
   name: 'basic-echarts',
   props: ['options'],
   data() {
      return {
         chart: null,
         width: '100%',
         height: '100%'
      };
   },
   methods: {
      initChart(el) {
         return new Promise((resolve) => {
            setTimeout(() => {
               this.chart = echarts.init(el, null, {renderer: 'svg', width: 'auto', height: 'auto'});
               resolve();
            }, 0);
         })
      },
      setOption(args) {
         if (!this.chart) {
            return;
         }
		
         const {option = {}, notMerge = false, lazyUpdate = false} = args;
         
         this.chart.setOption(option, notMerge, lazyUpdate);
      },
      dispose() {
         if (!this.chart) {
            return;
         }

         this.chart.dispose();
         this.chart = null;
      },
      resize() {
         this.chart && this.chart.resize();
      },
      getInstance() {
         return this.chart;
      }
   },
   mounted() {
      this.$nextTick(async function () {
         console.log('did mount');
         await this.initChart(this.$el);
         this.setOption(this.options);
         window.addEventListener('resize', throttle(this.resize, 100));
      })
   },
   beforeDestroy() {
      this.dispose();
   },
   watch: {
      options(newOpts) {
         console.log('update options');
         this.setOption(newOpts);
      }
   }
};
</script>

<style lang="scss" scoped>
@import '../../scss/_common.scss';
</style>

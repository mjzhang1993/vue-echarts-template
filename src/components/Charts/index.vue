<template>  
   <div class="default-chart" :style="{width, height}"></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import 'zrender/lib/svg/svg';
// 引入提示框和标题组件

import throttle from '../../utils/throttle';

export default {
   name: 'basic-echarts',
   props: {
      renderer: {
         type: String,
         required: false,
      },
      option: {
         type: Object,
         default: () => ({}),
      },
      notMerge: {
         type: Boolean,
         default: false,
      },
      lazyUpdate: {
         type: Boolean,
         default: false,
      },
   },
   data() {
      return {
         chart: null,
         width: '100%',
         height: '100%',
      };
   },
   methods: {
      initChart(el) {
         const renderer = this.renderer || 'canvas';
         console.log(renderer);
         this.chart = echarts.init(el, null, {
            renderer,
            width: 'auto',
            height: 'auto',
         });
      },
      setOption(option) {
         if (!this.chart) {
            return;
         }

         const notMerge = this.notMerge;
         const lazyUpdate = this.lazyUpdate;

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
      },
   },
   mounted() {
      this.$nextTick(function() {
         console.log('did mount');
         this.initChart(this.$el);
         this.setOption(this.option);
         window.addEventListener('resize', throttle(this.resize, 100));
      });
   },
   beforeDestroy() {
      this.dispose();
   },
   watch: {
      option(newOpt) {
         console.log('update config');
         this.setOption(newOpt);
      },
   },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_common.scss';
</style>

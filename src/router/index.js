import Vue from 'vue';
import Router from 'vue-router';
import Basic from '@/views/Basic';
import LineChart from '@/views/LineChart';
import BarChart from '@/views/BarChart';
import PieChart from '@/views/PieChart';
import ScatterChart from '@/views/ScatterChart';
import RadarChart from '@/views/RadarChart';
import TreeChart from '@/views/TreeChart';

// 类似的方式实现按需加载
// const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login');

Vue.use(Router);

const router = new Router({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'basic',
         component: Basic,
         children: [
            {
               path: 'line',
               name: 'lineChart',
               component: LineChart
            },
            {
               path: 'bar',
               name: 'barChart',
               component: BarChart
            },
            {
               path: 'pie',
               name: 'pieChart',
               component: PieChart
            },
            {
               path: 'scatter',
               name: 'scatterChart',
               component: ScatterChart
            },
            {
               path: 'radar',
               name: 'radarChart',
               component: RadarChart
            },
            {
               path: 'tree',
               name: 'treeChart',
               component: TreeChart
            },
            {
               path: '*',
               redirect: 'line'
            }
         ]
      },
      {
         path: '/*',
         redirect: '/'
      }
   ]
});

export default router;

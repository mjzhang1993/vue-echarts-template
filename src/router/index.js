import Vue from 'vue';
import Router from 'vue-router';
import Basic from '@/views/Basic';
import LineChart from '@/views/LineChart';
import BarChart from '@/views/BarChart';

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

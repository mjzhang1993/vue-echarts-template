import Vue from 'vue';
import Router from 'vue-router';
import Basic from '@/views/Basic';

// 类似的方式实现按需加载
// const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login');

Vue.use(Router);
 
const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Basic',
			component: Basic,
			children: [
			]
		}
	]
});

export default router;

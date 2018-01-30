// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import store from './store/index';
import App from './App';

// 阻止 vue 在启动时产生提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
   data: {},
   el: '#app',
   router,
   store,
   template: '<app/>',
   components: { App }
});

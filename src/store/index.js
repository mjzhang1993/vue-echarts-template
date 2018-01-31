/*
   vuex 的 store
*/
import Vue from 'vue';
import Vuex from 'vuex';
import rootSetting from './root-setting';
import basic from './modules/basic';
import charts from './modules/charts';

Vue.use(Vuex);

const modules = {
   basic,
   charts
};

const store = new Vuex.Store({
   ...rootSetting,
   modules,
   strict: process.env.NODE_ENV !== 'production'
});

export default store;

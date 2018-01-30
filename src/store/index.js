/*
   vuex 的 store
*/
import Vue from 'vue';
import Vuex from 'vuex';
import rootSetting from './root-setting';
import basic from './modules/basic';

Vue.use(Vuex);

const modules = {
   basic
};

const store = new Vuex.Store({
   ...rootSetting,
   modules,
   strict: process.env.NODE_ENV !== 'production'
});

export default store;

/*
   Charts 页 store 配置
*/
import { CHANGE_DATA } from '../types-constant';
import { getData } from '../../api/charts';

export default {
   namespaced: true,
   state: {
      line: [[]],
      bar: [[]],
      pie: [[]],
      scatter: {
         timeRange: [],
         data: [[[]]]
      },
      radar: [],
      tree: [{
         name: null,
         value: null,
         children: null
      }],
      treemap: [],
      sunburst: [],
      boxplot: [[]],
      candlestick: [[]]
   },
   getters: {},
   mutations: {
      [CHANGE_DATA](state, { key, value }) {
         state[key] = value;
      }
   },
   actions: {
      async changeData({ commit }, payload) {
         const { path, key } = payload;
         const newData = await getData(path);

         commit(CHANGE_DATA, { key, value: newData });
      }
   }
};

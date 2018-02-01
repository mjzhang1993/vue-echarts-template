/*
   合并对象，并确保响应式，基本上不用了，
   在 vuex 中 state 中的数据
   时应该使用 Vue.set(obj, 'newProp', 123), 或者以新对象替换老对象。
   两者取其一即可
*/
import Vue from 'vue';

export function classifyProps(obj, propsMap) {
   let tempProps = {};

   Object.keys(propsMap).forEach(item => {
      if (obj.hasOwnProperty(item)) {
         tempProps[item] = propsMap[item];
      } else {
         Vue.set(obj, item, propsMap[item]);
      }
   });

   return tempProps;
}

export default function merge(obj, ...propsMapList) {
   let mergeProps = {};

   propsMapList.forEach(propsMap => {
      mergeProps = Object.assign(mergeProps, classifyProps(obj, propsMap));
   });

   return Object.assign({}, obj, mergeProps);
}

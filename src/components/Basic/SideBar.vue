<template>
   <ul class="menu-container">
      <li class="menu-item" v-for="item in routePaths" :key="item.path">
         <router-link :to="{path: item.path, query: {name: item.name}}">
            {{item.path.toUpperCase() + `（${item.name}）`}}
         </router-link>
      </li>
   </ul>
</template>

<script>
export default {
   name: 'side-bar',
   data() {
      return {
         routePaths: [
            {path: 'bar', name: '柱形图'},
            {path: 'line', name: '折线图'},
            {path: 'pie', name: '饼图'},
            {path: 'scatter', name: '散点图'},
            {path: 'radar', name: '雷达图'},
            {path: 'tree', name: '树图'},
            {path: 'treemap', name: '面积树图'},
            {path: 'sunburst', name: '旭日图'},
            {path: 'boxplot', name: '箱型图'},
            {path: 'candlestick', name: 'K线图'}
         ]
      };
   },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_common.scss';

.menu-container {
   list-style: none;
   padding: 10px 10px;
   margin: 0;
   background-color: #333;
   overflow-y: auto;
   li {
      list-style: none;
      background-color: #888;
      height: 50px;
      display: flex;
      box-shadow: 0px 0px 20px rgba(238, 235, 235, 0.2);
      margin: 10px 0px;
      border-radius: 4px;
      cursor: pointer;
      transform: scale(1, 1);
      transition: all 0.1s ease-in-out;
      a {
         display: flex;
         color: #fff;
         width: 100%;
         height: 100%;
         justify-content: center;
         align-items: center;
      }
      &:hover {
         transform: scale(1.05, 1.05);
      }
   }
}
</style>

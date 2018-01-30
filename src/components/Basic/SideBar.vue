<template>
   <ul class="menu-container">
      <li class="menu-item" v-for="routeName in routeNames" :key="routeName">
         <router-link :to="{name: routeName}">
            {{routeName.toUpperCase()}}
         </router-link>
      </li>
   </ul>
</template>

<script>
export default {
   name: 'side-bar',
   data() {
      return {
         routeNames: [
            'bar', 'line', 'pie'
         ]
      }
   }
}
</script>

<style lang="scss" scoped>
@import '../../scss/_common.scss';

.menu-container {
   list-style: none;
   padding: 10px 10px;
   margin: 0;
   background-color: #333;
   overflow: auto;
   li {
      list-style: none;
      background-color: #888;
      height: 50px;
      display: flex;
      // border-bottom: 1px dashed darkgray;
      box-shadow: 0px 0px 20px rgba(238, 235, 235, 0.2);
      margin: 10px 0px;
      border-radius: 4px;
      cursor: pointer;
      transform: scale(1, 1);
      transition: all .1s ease-in-out;
      a {
         display: flex;
         color: #fff;
         width: 100%;
         height: 100%;
         justify-content: center;
         align-items: center;
      }
      &:hover{
         transform: scale(1.05, 1.05);
      }
   }
}

</style>

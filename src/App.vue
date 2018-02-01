<template>
<div id="app">
	<router-view/>
</div>
</template>

<script>
export default {
   name: 'app',
};
</script>

<style lang="scss">
@import './scss/_common.scss';

html {
   box-sizing: border-box;
}

body {
   -moz-osx-font-smoothing: grayscale;
   -webkit-font-smoothing: antialiased;
   text-rendering: optimizeLegibility;
   font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
   width: 100%;
   height: 100%;
}

*,
*:before,
*:after {
   box-sizing: inherit;
}

a:focus,
a:active {
   outline: none;
}

a,
a:focus,
a:hover {
   cursor: pointer;
   color: inherit;
   text-decoration: none;
}

#app {
   /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   @include pa;
}
</style>

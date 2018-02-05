<template>
<div class="basic-container">
	<header class="header">
		this is Vue-ECharts-Template
	</header>
	<div class="main">
		<SideBar class="main-sidebar"/>
		<div class="main-charts-content">
			<header class="main-header">
				<p>{{title}}</p>
			</header>
			<div class="charts">
				<router-view></router-view>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import SideBar from '../components/Basic/SideBar';

export default {
   name: 'basic',
   data() {
      return {
         isOpen: true,
         title: 'this is title'
      };
   },
   components: { SideBar }
};
</script>

<style lang="scss" scoped>
@import '../scss/_common.scss';

.basic-container {
   @include pa;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   overflow: hidden;
}
.header {
   width: calc(100% - 20px);
   height: 60px;
   @include flexh;
   font-size: 30px;
   margin: 0px 10px;
}
.main {
   flex-grow: 1;
   width: 100%;
   height: 0;
   display: flex;
   justify-content: flex-start;
   align-items: flex-start;
   position: relative;
}
.main-sidebar {
   width: 200px;
   height: 100%;
}
.main-charts-content {
   width: 0;
   flex-grow: 1;
   height: 100%;
   @include flexv;
   .charts {
      width: 100%;
      height: 0;
      flex-grow: 1;
   }
}
.main-header {
   width: 100%;
   height: 50px;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   border-bottom: 1px solid #666;
   border-top: 1px solid #666;
   p {
      width: 0;
      flex-grow: 1;
      height: 100%;
      margin: 0;
      padding: 0;
      @include flexh;
      font-size: 24px;
   }
   button {
      @include flexh;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      outline: none;
      margin-left: 10px;
      font-size: 24px;
      color: #666;
      line-height: 0;
      transform: rotate(180deg);
      transition: all 0.1s ease-in-out;
   }
   .close {
      transform: rotate(0deg);
   }
}
</style>

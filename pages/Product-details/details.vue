<template>
	<!-- 导航栏 -->
	<view class="search-back">
		<view :style=" 'height:' + S_top + 'px;' "></view>
		<view class="search-input" :style=" ['height:' + S_height + 'px;','padding-right:' + S_width + 'px;'] ">
			<view class="tab-jiantou">
				<image src="/static/detail/fanhuijiantou.svg" mode="aspectFit"></image>
			</view>
			<view class="tab-view" v-for="(item,index) in tab_name" :key="index" :style=" 'height:' + S_height + 'px;' ">
				<text>{{item}}</text>
				<text></text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {reactive,toRefs,onMounted} from 'vue'
	
	//顶部导航栏
	const search_data = reactive({
		tab_name:['商品','评价','详情'],
		S_height:0,
		S_top:0,
		S_width:0,
		Custom_height:0
		
	})
	const {tab_name,S_height,S_top,S_width,Custom_height} = toRefs(search_data);
	
	//获取胶囊按钮坐标数据
	onMounted(()=>{
		const but_data = wx.getMenuButtonBoundingClientRect();
		search_data.S_height = but_data.height;
		search_data.S_top = but_data.top;
		search_data.S_width = but_data.width;
		search_data.Custom_height = but_data.height + but_data.top + 10;
	})
</script>

<style>
page{background-color: #f6f6f6;}
.search-back{
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
}
.search-input{
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.tab-jiantou{
	width: 50rpx;
	height: 50rpx;
}
.tab-jiantou image{
	width: 50rpx;
	height: 50rpx;
}
.tab-view{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.tab-view text:nth-child(2){
	width: 30rpx;
	height: 10rpx;
	border-radius: 10rpx;
	position: absolute;
	bottom: 0;
}
.active{
	background-color: #f67319;
}
</style>
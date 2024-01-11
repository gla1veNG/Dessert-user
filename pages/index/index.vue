<template>
	<!-- 搜索框 -->
	<view class="search-back" :style="'height:' + Custom_height + 'px;'">
		<view :style="'height:' + S_top + 'px;'"></view>
		<view class="search-input" :style="['height:' + S_height + 'px;','width:' + S_left + 'px;']">
			<image src="/static/sousuo.png" mode="widthFix"></image>
			<input type="text" :style="'height:' + S_height + 'px;'" placeholder="请输入搜索的商品" disabled/>
		</view>
	</view>
	<!-- 轮播图 -->
	<view :style="'height:' + Custom_height + 'px;' "></view>
</template>

<script setup>
	import {onMounted,reactive,toRefs} from 'vue'
	
	//获取胶囊按钮坐标数据
	const search_data = reactive({
		S_height:0,
		S_top:0,
		S_left:0,
		Custom_height:0
	})
	
	const {S_height,S_top,S_left,Custom_height} = toRefs(search_data);
	onMounted(()=>{
		const but_data = wx.getMenuButtonBoundingClientRect();
		search_data.S_height = but_data.height;
		search_data.S_top = but_data.top;
		search_data.S_left = but_data.left - 30;
		search_data.Custom_height = but_data.height + but_data.top + 10;
	})
</script>

<style>
page{background-color: #f4f4f4;}
/* 首页自定义搜索框 */
.search-back{
	/* background-color: #4CD964; */
	background-color: #e94b37;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
}
.search-input{
	background: #FFFFFF;
	border-radius: 50upx;
	margin-left: 20rpx;
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
}
.search-input input{
	width: 100%;
	font-size: 30upx;
	color: #b2b2b2;
	padding-left: 80upx;
}
.search-input image{
	width: 35upx;
	height: 35upx;
	position: absolute;
	left: 30upx;
	align-self: center;
}
</style>


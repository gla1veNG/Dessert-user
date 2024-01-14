<template>
	<view class="flash-view">
		<view class="count-down">每日秒杀</view>
		<view class="flex-view">
			<view class="commodity" v-for="(item,index) in seckill" :key="index" @click="juMp(item.goods_id,item.video_url)">
				<image :src="item.cover" mode="aspectFill"></image>
				<view>
					<text class="overflow">{{item.title}}</text>
					<text>{{item.price_spike}}￥</text>
					<text>{{item.ori_price}}￥</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from 'vue'
	defineProps({seckill:Array});
	
	//跳转详情页
	function juMp(goods_id,video_url){
		if(video_url === ''){
			console.log('跳转详情页');
		}else{
			wx.navigateTo({
				url:`/pages/Short-video/video?goods_id=${goods_id}`
			})
		}
	}
</script>

<style scoped>
.flash-view{
	background: linear-gradient(to bottom, #e98e0f 25%, #ffe0aa 100%);
	border-radius: 20rpx;
	padding: 20rpx 0;
	margin: 30rpx 20rpx 0 20rpx;
}
.count-down{
	color: #FFFFFF;
	padding-bottom: 15rpx;
	padding-left: 20rpx;
	font-style: oblique;
	font-weight: bold;
}
/* 宫格布局 */
.flex-view{
	display: flex;
	flex-wrap: wrap;
	margin: 0 20rpx;
}
.commodity{
	width: calc(25% - 10rpx*2);
	margin: 10rpx;
}
.commodity image{
	width: 100%;
	height: 150rpx;
	border-radius: 20rpx;
}
.commodity view{
	width: 90%;
}
.commodity view text:nth-child(1){
	margin: 10rpx 0;
}
.commodity view text:nth-child(2){
	color: #e01222;
	font-weight: bold;
}
.commodity view text:nth-child(3){
	text-decoration: line-through;
	font-size: 25rpx;
	color: #9c9c9c;
	padding-left: 10rpx;
}
.overflow{
	-webkit-line-clamp: 1 !important;
}
</style>>
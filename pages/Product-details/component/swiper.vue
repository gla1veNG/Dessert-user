<template>
	<!-- 轮播 -->
	<view class="swiper-view">
		<swiper :duration="1000" :circular="true" @change="changeCurrent">
			<swiper-item>
				<view class="swiper-item">
					<image class="imageurl" src="/static/detail/shuxing-img.png" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 自定义指示点 -->
		<view class="point">1/3</view>
	</view>
	<!-- 秒杀 -->
	<view class="seckill">
		<view class="seckill-top seckill-flex">
			<text>秒杀中</text>
			<text class="seckill-Center">已售 5</text>
			<text>距离结束还有:</text>
		</view>
		<view class="seckill-flex">
			<text class="price-spike">9.9￥</text>
			<text class="seckill-Center ori-price">19.9￥</text>
			<view class="se-time">
				<text>01</text>
				<text>天</text>
				<text>23</text>
				<text>:</text>
				<text>50</text>
				<text>:</text>
				<text>20</text>
			</view>
		</view>
	</view>
	<!-- 普通价格 -->
	<view class="price-view" style="display: none;">
		<view>19.9￥</view>
		<view>已售 10</view>
	</view>
	<!-- 标题 -->
	<view class="detail-title">这是标题这是标题这是标题这是标题这是标题这是标题这是标题</view>
</template>
<script setup>
	function changeCurrent(e){
		
	}
</script>

<style scoped>
.imageurl {
	width: 100%;
	height: 700rpx !important;
}

.swiper-view {
	height: 700rpx !important;
	position: relative;
}
swiper{
	height: 700rpx !important;
}
.point{
	position: absolute;
	bottom: 10rpx;
	right: 20rpx;
	background-color: #333333;
	opacity: 0.5;
	color: #FFFFFF;
	font-size: 25rpx;
	width: 100rpx;
	height: 50rpx;
	border-radius: 50rpx;
	line-height: 50rpx;
	text-align: center;
}
/* 价格 */
.price-view{
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	height: 100rpx;
}
.price-view view:nth-child(1){
	color: #e9445a;
	font-size: 40rpx;
	font-weight: bold;
}
.price-view view:nth-child(2){
	color: #b1b2b5;
}
/* 秒杀 */
.seckill{
	background-color: #e74e64;
	padding: 10rpx 20rpx;
	color: #ffffff;
}
.seckill-flex{
	display: flex;
	align-items: center;
}
.seckill-Center{
	flex: 1;
	padding: 0 20rpx;
}
.seckill-top{
	padding-bottom: 10rpx;
	font-size: 25rpx;
}
.seckill-top text:nth-child(1){
	background-color: #f6d3db;
	padding: 5rpx 15rpx;
	color: #ea4163;
	border-radius: 5rpx;
}
.price-spike{
	font-size: 35rpx;
	font-weight: bold;
}
.ori-price{
	text-decoration: line-through;
	color: #f1b0be;
}
.se-time{
	display: flex;
	align-items: center;
}
.se-time text{
	margin-left: 10rpx;
}
.se-time text:nth-child(odd){
	background-color: #eb6578;
	padding: 2rpx 10rpx;
	border-radius: 10rpx;
}
/* 标题 */
.detail-title{
	padding: 20rpx;
	line-height: 1.5;
	background-color: #FFFFFF;
	margin: 20rpx 0;
}
</style>
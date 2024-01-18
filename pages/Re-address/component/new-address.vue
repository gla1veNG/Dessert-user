<template>
	<page-container :show="show" positon="bottom" bindenter="onEnter">
		<view class="space-view">
			<view class="address-title">
				<text>新建收货地址</text>
				<icon class="icon-small" type="cancel" size="23" @click="show = false"></icon>
			</view>
			<view class="address-input">
				<text>收货人</text>
				<input type="text">
			</view>
			<view class="address-input">
				<text>手机号码</text>
				<input type="number">
			</view>
			<view class="address-input">
				<text>选择地址</text>
				<picker class="flex-left" mode="region">
					<view>
						<text>广东省xx市</text>
						<image src="/static/detail/xiangyou-jiantou.svg" mode="aspectFit"></image>
					</view>
				</picker>
			</view>
			<view class="address-input">
				<text>详细地址</text>
				<input type="text">
			</view>
			<view class="New-address">
				保存
			</view>
		</view>
	</page-container>
</template>

<script setup>
	import {show} from '@/Acc-config/answer.js'
	function onEnter(){}
</script>

<style scoped>
.address-title{
	display: flex;
}
.address-title text{
	flex: 1;
	text-align: center;
	font-weight: bold;
}
.address-title icon{
	margin-left: auto;
}
/* 输入部分 */
.address-input{
	display: flex;
	align-items: center;
	margin: 40rpx 0;
	padding-bottom: 40rpx;
	color: #b4b4b4;
	border-bottom: 1rpx solid #e2e2e2;
}
.address-input image{
	width: 40rpx;
	height: 40rpx;
	display: block;
}
.address-input input{
	flex: 1;
	padding: 0 20rpx;
	color: #000000;
}
.flex-left{
	flex: 1;
}
.flex-left view{
	display: flex;
	justify-content: space-between;
}
.flex-left text{
	padding: 0 20rpx;
	color: #000000;
}
</style>
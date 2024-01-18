<template>
	<view class="Re-view">
		<view class="Re-address Re-flex">
			<view>
				<view class="Re-name Re-flex">
					<text>小明</text>
					<text>1523248545</text>
				</view>
				<text>广东省xx市</text>
			</view>
			<view>
				<icon class="icon-small" type="success_no_circle" size="23"></icon>
			</view>
		</view>
	
	<!-- 设置默认 -->
	<view class="Defa-address Re-flex">
		<view class="Re-flex">
			<icon class="icon-small" type="success" size="23"></icon>
			<text class="Defa-padd">设为默认</text>
		</view>
		<view class="Re-flex">
			<text>删除</text>
			<text class="Defa-padd">修改</text>
		</view>
	</view>
</view>
<!-- 没有数据的提示 -->
<!-- <view class="Tips">您还没有收货地址</view> -->
<!-- 底部 -->
<view style="height: 300rpx;"></view>
<view class="New-address" @click="newAddress">+ 新建地址</view>
<!-- 弹窗 -->
<Address/>
</template>

<script setup>
	import Address from '@/pages/Re-address/component/new-address.vue'
	import {show} from '@/Acc-config/answer.js'
	
	//调用弹窗新建地址
	function newAddress(){
		show.value = true;
	}
</script>

<style>
page{
	background-color: #fafafa;
}
.Re-view{
	background-color: #FFFFFF;
	padding: 20rpx;
	margin: 20rpx 0;
}
.Re-address{
	justify-content: space-between;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #e1e1e1;
}
.Re-flex{
	display: flex;
	align-items: center;
}
.Re-name text:nth-child(1){
	font-weight: bold;
	padding-right: 20rpx;
}
.Re-name text:nth-child(2){
	color: #8c8c8c;
}
.Re-name{
	padding-bottom: 20rpx;
}
/* 默认地址 */
.Defa-address text{
	display: block;
	color: #8c8c8c;
}
.Defa-address{
	justify-content: space-between;
	padding-top: 20rpx;
}
.Defa-padd{
	padding-left: 30rpx;
}
/* 禁用点击 */
.Disable{
	pointer-events: none;
}
</style>
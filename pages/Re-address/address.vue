<template>
	<view class="Re-view" v-for="(item,index) in address" :key="index">
		<view class="Re-address Re-flex">
			<view>
				<view class="Re-name Re-flex">
					<text>{{item.name}}</text>
					<text>{{item.mobile}}</text>
				</view>
				<text>{{item.district + item.address}}</text>
			</view>
			<view v-if="item.tacitly">
				<icon class="icon-small" type="success_no_circle" size="23"></icon>
			</view>
		</view>
	
	<!-- 设置默认 -->
	<view class="Defa-address Re-flex">
		<view class="Re-flex" :class="[item.tacitly ? 'Disable' : '']">
			<icon class="icon-small" type="success" size="23" v-if="item.tacitly"></icon>
			<text class="Defa-padd">{{item.tacitly ? '已设为默认' : '设为默认'}}</text>
		</view>
		<view class="Re-flex">
			<text>删除</text>
			<text class="Defa-padd">修改</text>
		</view>
	</view>
</view>
<!-- 没有数据的提示 -->
<view class="Tips" v-if="address.length === 0">您还没有收货地址</view>
<!-- 底部 -->
<view style="height: 300rpx;"></view>
<view class="New-address" @click="newAddress">+ 新建地址</view>
<!-- 弹窗 -->
<Address/>
</template>

<script setup>
	import Address from '@/pages/Re-address/component/new-address.vue'
	import {show} from '@/Acc-config/answer.js'
	import {onMounted,reactive,toRefs} from 'vue'
	const db = wx.cloud.database();
	
	//调用弹窗新建地址
	function newAddress(){
		show.value = true;
	}
	//请求数据
	onMounted(()=>{getAdd()});
	const data = reactive({address:{}});
	const {address} = toRefs(data);
	async function getAdd(){
		const res = await db.collection('re_address').get();
		data.address = res.data;
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
<template>
	<page-container :show="show" positon="bottom" bindenter="onEnter">
		<view class="space-view">
			<view class="address-title">
				<text>新建收货地址</text>
				<icon class="icon-small" type="cancel" size="23" @click="show = false"></icon>
			</view>
			<view class="address-input">
				<text>收货人</text>
				<input type="text" v-model="result.name">
			</view>
			<view class="address-input">
				<text>手机号码</text>
				<input type="number" v-model="result.mobile">
			</view>
			<view class="address-input">
				<text>选择地址</text>
				<picker class="flex-left" mode="region">
					<view>
						<text>{{result.district}}</text>
						<image src="/static/detail/xiangyou-jiantou.svg" mode="aspectFit"></image>
					</view>
				</picker>
			</view>
			<view class="address-input">
				<text>详细地址</text>
				<input type="text" v-model="result.address">
			</view>
			<view class="New-address" @click="subMit(_id)">
				{{_id === '' ? '保存' : '修改地址'}}
			</view>
		</view>
	</page-container>
</template>

<script setup>
	import {show} from '@/Acc-config/answer.js'
	import {onMounted,reactive,toRefs} from 'vue'
	import {Public} from '@/Acc-config/public.js'
	const db = wx.cloud.database();
	function onEnter(){}
	
	//输入框的值
	const data = reactive({
		result:{
			name:'',//姓名
			mobile:'',//手机号码
			district:'',//省市区
			address:'',//详细地址
			tacitly:false, //默认收货地址标示
		},
		_id:''//用于判断是提交新数据还是修改数据
	})
	const {result} = toRefs(data);
	//校验数据
	function subMit(_id){
		let phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
		switch(true){
			case data.result.name === '' : new Public().toast('请填写姓名');
			break;
			
			case data.result.mobile === '': new Public().toast('请填写手机号码');
			break;
			
			case !phone.test(data.result.mobile) : new Public().toast('请填写正确手机号码格式');
			break;
			
			case data.result.district === '' : new Public().toast('请选择地址');
			break;
			
			case data.result.address === '' : new Public().toast('请填写详细地址');
			break;
			default : database();
		}
	}
	//提交到数据库
	function database(){
		console.log('通过');
	}
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
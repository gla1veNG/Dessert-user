<template>
	<!-- 公用的sku规格选择弹窗 -->
	<page-container :show="sku_popup.show" positon="bottom" bindenter="onEnter">
		<view class="space-view">
			<!-- 展示已选的规格：图片，价格等-->
			<view class="space-price">
				<view class="space-goods-img">
					<image :src="goods.goods_cover" mode="aspectFill"></image>
				</view>
				<view class="space-text">
					<view class="space-text-price">
						<text>{{goods.goods_price}}</text>
						<text>秒杀价：9.9</text>
					</view>
					<text class="space-text-stock">库存：{{goods.stock}}</text>
					<view class="choice">
						<text>请选择</text>
						<text>微辣</text>
					</view>
				</view>
				<view class="space-xx">
					<image src="/static/detail/guanbi.svg" mode="aspectFit" @click="sku_popup.show = false "></image>
				</view>
			</view>
			<!-- sku选择区域 -->
			<view class="space-mar">
				<text class="space-title">口味</text>
				<view class="space-sku">
					<text>微辣</text>
				</view>
			</view>
			<!-- 购买数量 -->
			<view class="Pur-quantity">
				<view class="Pur-title">购买数量</view>
				<view class="Pur-image">
					<image src="/static/detail/jianshao.png" mode="aspectFit"></image>
					<text>1</text>
					<image src="/static/detail/tianjia.png" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 给一个防止超出页面的区域被按钮给盖住 -->
			<view style="height: 200rpx;"></view>
			<!-- 底部 -->
			<view class="space-botton">
				<view>{{sku_popup.judge === 'j_sho' ? '加入购物车' : '立即购买'}}</view>
			</view>
		</view>
	</page-container>	
</template>

<script setup>
	function onEnter(){}
	//详情页点击底部加入购物车或购买拉起sku弹窗
	import {sku_popup} from '@/Acc-config/answer.js'
	import {defineProps,watch,reactive,toRefs} from 'vue'
	
	const props = defineProps({sku_data:Array,goods:Object});
	const skudata = reactive({goods:{}});
	 const {goods} =toRefs(skudata)
	watch(props,(newVal,oldVal)=>{
		console.log(newVal);
		skudata.goods = newVal.goods;
		if(newVal.sku_data.length === 0){return false}
		const sku_data = newVal.sku_data[0];
		//取出标题
		const sku_name = sku_data.sku[0].att_data.map(item=>item.att_name);
		
	})
</script>

<style scoped>
.space-goods-img{
	width: 180rpx;
	height: 180rpx;
}
.space-goods-img image{
	width: 180rpx;
	height: 180rpx;
	border-radius: 10rpx;
}
.space-xx{
	width: 30rpx;
	height: 30rpx;
}
.space-xx image{
	width: 30rpx;
	height: 30rpx;
}
.space-price{
	display: flex;
	border-bottom: 1rpx solid #ececed;
	padding-bottom: 20rpx;
}
.space-price text{
	display: block;
}
.space-text{
	flex: 1;
	align-self: flex-end;
	padding: 0 20rpx;
	font-size: 26rpx;
}
.space-text-price{
	display: flex;
	align-items: center;
}
.space-text-price text:nth-child(1){
	color: #e9445a;
	font-size: 40rpx;
}
.space-text-price text:nth-child(2){
	font-size: 30rpx;
	background-color: #e9445a;
	color: #ffffff;
	border-radius: 40rpx;
	padding: 10rpx;
	margin-left: 20rpx;
}
.space-text-stock{
	padding: 8rpx 0;
	color: #8d8e92;
}
.choice{
	display: flex;
	align-items: center;
	color: #8d8e92;
	flex-wrap: wrap;
}
.choice text{
	padding-right: 10rpx;
}
.choice text:nth-child(1){
	color: #333333 !important;
}
.space-mar{
	margin: 20rpx 0;
	border-bottom: 1rpx solid #ececed;
}
.space-title{
	margin-bottom: 20rpx;
	display: block;
	font-weight: bold;
}
.space-sku{
	display: flex;
	flex-wrap: wrap;
}
.space-sku text{
	font-size: 28rpx;
	background-color: #f8f8f8;
	padding: 10rpx 20rpx;
	margin: 0 20rpx 20rpx 0;
	border-radius: 8rpx;
}
.Pur-quantity image{
	width: 50rpx;
	height: 50rpx;
	display: block;
}
.Pur-quantity{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.Pur-title{font-weight: bold;}
.Pur-image{
	display: flex;
	align-items: center;
}
.Pur-image text{
	padding: 0 40rpx;
}
.space-botton{
	background-color: #fefefe;
	height: 150rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
.space-botton view{
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	color: #FFFFFF;
	background-color: #e9445a;
	margin: 10rpx 20rpx;
	border-radius: 6rpx;
}

/* 点击后加上新样式 */
.new_style{
	background-color: #e9445a !important;
	color: #FFFFFF;
}

</style>
<template>
	<!-- tab切换 -->
	<view class="order-tab">
		<view v-for="(item,index) in tab" :key="index">
			<text>{{item.name}}</text>
			<text :class="{order_Select:index === re}"></text>
		</view>
	</view>
	<view style="height: 60rpx;"></view>
	<!-- 订单数据 -->
	<view class="order-back">
		<view class="order-card">
			<view>
				<image src="/static/detail/jianshao.png" mode="aspectFill"></image>
			</view>
			<view>
				<text class="order-title-padd">这是标题</text>
				<text class="order-specs">规格</text>
			</view>
			<view>
				<text class="order-title-padd order-num">1.3</text>
				<text class="order-num">x3</text>
			</view>
		</view>
		<!-- 合计 -->
		<view class="order-total">
			<text>合计</text>
			<text>20</text>
		</view>
<!-- 支付的状态 -->
		<!-- 支付成功的状态 -->
		<view class="order-button">
			<!-- 待发货 申请退款 -->
			<block>
				<text class="order-button-a">待发货</text>
				<text class="order-button-b">申请退款</text>
			</block>
			<!-- 确认收货 查看物流 申请退款 -->
			<!-- block>
				<text class="order-button-a">确认收货</text>
				<text class="order-button-b">查看物流</text>
				<text class="order-button-b">申请退款</text>
			</block> -->
			<!-- 已发货 评价 申请退款 -->
			<!-- <block>
				<text class="order-button-a">已发货</text>
				<text class="order-button-b">评价</text>
				<text class="order-button-b">申请退款</text>
			</block> -->
			<!-- 申请退款中 -->
			<!-- <block>
				<text class="order-button-b">申请退款中</text>
			</block> -->
			<!-- 退款成功 -->
			<!-- <block >
				<text class="order-button-b">退款成功</text>
			</block> -->
		</view>
		<!-- 待支付的状态 -->
		<view class="order-button">
			<!-- 取消订单 -->
			<!-- 继续支付 -->
			<!-- <text class="order-button-b">取消订单</text>
			<text class="order-button-b">继续支付</text> -->
		</view>
		<!-- 已取消订单的状态 -->
		<view class="order-button">
			<!-- 订单已取消 -->
			<!-- <text class="order-button-a">订单已取消</text> -->
		</view>
	</view>
	<!-- 没有数据的提示 -->
	<view class="Tips">没有订单数据</view>
	<!-- 上拉加载提示 -->
	<view class="loading-hei">
		<Loading></Loading>
	</view>
	<view style="height: 200rpx;"></view>
	<!-- 支付弹窗 -->
	<page-container :show="false" round="true">
		<view class="customStyle">
		<view class="container-guan"><image src="/static/detail/guanbi.svg" mode="widthFix"></image></view>
		<view class="container-price">
			<text>零食商城平台</text>
			<text>20¥</text>
		</view>
		<view class="Payment-Methods">
			<text>支付方式</text>
			<text>零钱通</text>
		</view>
		<view class="Confirm-payment">
			<button type="primary" loading="loadIng">确认支付</button>
		</view>
		</view>
	</page-container>
</template>
<script setup>
	import {reactive,toRefs,ref} from 'vue'
	const re = ref(0)
	const data = reactive({
		tab: [{
				name: '全部',
				query: {}
			},
			{
				name: '待支付',
				query: {
					pay_success: 'not_pay'
				}
			},
			{
				name: '待发货',
				query: {
					pay_success: 'success',
					deliver: 'stay'
				}
			},
			{
				name: '待收货',
				query: {
					pay_success: 'success',
					deliver: 'already'
				}
			},
			{
				name: '待评价',
				query: {
					pay_success: 'success',
					deliver: 'rece_goods',
					evaluate: false
				}
			}
		]
	})
	const {tab} = toRefs(data)
</script>

<style>
page{
	background-color: #f8f8f8;
}
.order-tab{
	height: 60rpx;
	background-color: #FFFFFF;
	display: flex;
	justify-content: space-around;
	color: #737373;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.order-tab view{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.order_Select{
	display: block;
	width: 40rpx;
	height: 10rpx;
	border-radius: 50rpx;
	background-color: #ea4050;
	position: absolute;
	bottom: 0;
}
/* 订单卡片 */
.order-back{
	background-color: #fefefe;
	padding: 20rpx;
	margin: 20rpx 0;
}
.order-card image{
	width: 150rpx;
	height: 150rpx;
	display: block;
	border-radius: 8rpx;
}
.order-card{
	display: flex;
}

.order-card view:nth-child(2){
	flex: 1;
	padding: 0 20rpx;
}
.order-title-padd{
	margin-bottom: 20rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.order-specs{
	background-color: #fafafa;
	font-size: 27rpx;
	color: #767676;
	padding: 10rpx;
	border-radius: 9rpx;
}
.order-num{
	color: #8b8c90;
}
/* 合计 */
.order-total{
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-bottom: 30rpx;
}
.order-total text{
	display: block;
	padding-left: 20rpx;
}
.order-total text:nth-child(1){
	color: #8b8c90;
}
.order-total text:nth-child(2){
	font-weight: bold;
	font-size: 34rpx;
}
/* 按钮 */
.order-button{
	display: flex;
	justify-content: flex-end;
}
.order-button text{
	padding: 15rpx 35rpx;
	margin-left: 20rpx;
	border-radius: 10rpx;
}
.order-button-a{
	border: 1rpx solid #d7d8d8;
	color: #8b8c90;
}
.order-button-b{
	background-color: #ea4050;
	color: #FFFFFF;
}
</style>
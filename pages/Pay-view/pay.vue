<template>
	<!-- 收货地址 -->
	<view class="pay-address">
		<view class="pay-address-left">
			<image src="/static/detail/dingdan-dizhi.svg" mode="aspectFit"></image>
		</view>
		<view class="pay-address-name">
			<view>
				<text>小明</text>
				<text>152866772</text>
			</view>
			<text>广东省xx市</text>
		</view>
		<view class="pay-address-right">
			<image src="/static/detail/xiangyou-jiantou.svg" mode="aspectFit"></image>
		</view>
	</view>
	<!-- 商品详情 -->
	<view class="pay-goods" >
			<view>
				<image src="/static/detail/jianshao.png" mode="aspectFill"></image>
			</view>
			<view style="width: 100%;">
				<text class="pay-goods-title">这是标题</text>
				<text class="pay-goods-specs">微辣</text>
				<view class="pay-goods-price">
					<text>9.9￥</text>
					<!-- <text></text> -->
					<view>
						<image src="/static/detail/jianshao.png" mode="aspectFit"></image>
						<text>1</text>
						<image src="/static/detail/tianjia.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	<!-- 支付按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="set-accounts">
		<view>20￥</view>
		<view>提交订单</view>
	</view>
</template>

<script>
</script>

<style>
page{
	background-color: #f6f6f6;
}
.pay-address{
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	padding: 20rpx;
	margin-bottom: 20rpx;
}
.pay-address-left image{
	display: block;
	width: 40rpx;
	height: 40rpx;
}
.pay-address-right image{
	display: block;
	width: 30rpx;
	height: 30rpx;
}
.pay-address-name{
	flex: 1;
	padding: 0 20rpx;
}
.pay-address-name view{
	display: flex;
	align-items: center;
}
.pay-address-name view text:nth-child(1){
	padding-right: 10rpx;
	font-weight: bold;
}
.pay-address-name view text:nth-child(2){
	color: #8b8b8d;
}
/* 待支付商品 */
.pay-goods{
	background-color: #FFFFFF;
	display: flex;
	padding: 20rpx 20rpx 40rpx 20rpx;
}
.pay-goods text{
	display: block;
}
.pay-goods image{
	display: block;
	width: 200rpx;
	height: 200rpx;
	margin-right: 20rpx;
	border-radius: 6rpx;
}
.pay-goods-title{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box !important;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.pay-goods-specs{
	background-color: #fafafa;
	padding: 10rpx;
	display: inline-block !important;
	font-size: 28rpx;
	color: #a4a4a4;
	margin-top: 20rpx;
}
.pay-goods-price{
	padding-top: 50rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
}
.pay-goods-price image{
	width: 50rpx;
	height: 50rpx;
	display: block;
	margin: 0 !important;
}
.pay-goods-price view{
	display: flex;
	align-items: center;
	padding-left: 20rpx;
}
.pay-goods-price view text{
	padding: 0 40rpx;
}
/* 结算 */
.set-accounts{
	background-color: #FFFFFF;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 20rpx 68rpx 20rpx;
}
.set-accounts view:nth-child(1){
	color: #fc324a;
	font-size: 35rpx;
	font-weight: bold;
}
.set-accounts view:nth-child(2){
	background-color: #ea445a;
	color: #FFFFFF;
	font-size: 35rpx;
	padding: 15rpx 35rpx;
	border-radius: 10rpx;
}
</style>
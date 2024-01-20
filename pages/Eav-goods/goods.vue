<template>
	<textarea placeholder="请输入评价内容"
	:auto-focus='true'
	maxlength="200"
	cursor-spacing="50" 
	v-model="eav_text"
	/>
	
	<view class="goods-image">
		<view class="upload-Image" >
			<image src="/static/sousuo.png" mode="aspectFill" ></image>
			<image src="/static/detail/shanchu-goods.svg" mode="aspectFit"></image>
		</view>
		<view ><image src="/static/detail/shuxing-img.png" mode="aspectFill"></image></view>
	</view>
	<view class="newly-added-view back">
		<view class="newly-added">提交</view>
	</view>
	
</template>

<script>
</script>

<style>
page{
	background-color: #f2f2f2;
}
textarea{
	box-sizing: border-box;
	background-color: #FFFFFF;
	padding: 10rpx;
	width: 100%;
	height: 350rpx;
	line-height: 1.5;
	margin-bottom: 20rpx;
}
.goods-image{
	display: flex;
	flex-wrap: wrap;
}
.goods-image view{
	width: calc(33.3% - 5rpx*2);
	height: 200rpx;
	margin: 5rpx;
}
.goods-image image{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 7rpx;
}
.upload-Image {
	position: relative;
}
.upload-Image image:nth-child(2){
	width: 30rpx !important;
	height: 30rpx !important;
	position: absolute;
	top: 0;
	right: 0;
}
.back{
	background-color: #f2f2f2 !important;
}
</style>
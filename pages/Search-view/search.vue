<template>
	<view class="search-mar">
		<view class="search-input">
			<image src="/static/sousuo.png" mode="widthFix"></image>
			<input type="text" v-model="keyword" :focus="true" confirm-type="搜索" @confirm="seArch"/>
		</view>
		<view @click="seArch">搜索</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history">
		<text>历史记录</text>
		<image src="/static/detail/shanchu.svg" mode="aspectFit"></image>
	</view>
	<view class="history-text">
		<text>零食</text>
	</view>
	<!-- 商品展示 -->
	<Card :card="card"/>
</template>

<script setup>
	import {ref} from 'vue'
	import Card from '@/pages/common-component/Card-goods.vue'
	
	const keyword = ref('');
	
	//触发搜索
	function seArch(){
		//本地缓存搜索历史
		let sear_array = wx.getStorageSync('search_key') || [];//存储之前先取
		sear_array.unshift(keyword.value);
		wx.setStorageSync('search_key',sear_array);
		searchQuery();
	}
	//数据库的模糊查询
	const db = wx.cloud.database();
	const _ = db.command;
	const card = ref([])
	async function searchQuery(sk=0){
		//模糊字段匹配
		let query = _.or([
			{
					category:db.RegExp({
					regexp:keyword.value,
					options: 'i',
				})
			},
			{
					goods_title:db.RegExp({
					regexp:keyword.value,
					options: 'i',
				})
			}
		])
		const res = await db.collection('goods').where(query).limit(10).skip(sk).get();
		card.value = [...card.value,...res.data];
	}
</script>

<style scoped>
.search-mar{
	margin: 0 20rpx;
	display: flex;
	align-items: center;
}
.search-mar view:nth-child(2){
	height: 70rpx;
	line-height: 70rpx;
	padding-left: 30rpx;
}
.search-input{
	display: flex;
	flex-direction: row;
	flex: 1;
	position: relative;
}
.search-input image{
	width: 35rpx;
	height: 35rpx;
	position: absolute;
	left: 20rpx;
	align-self: center;
}
.search-input input{
	background-color: #f4f4f4;
	width: 100%;
	height: 70rpx;
	padding: 0 20rpx 0 75rpx;
	border-radius: 8rpx;
}
/* 历史记录 */
.history image{
	display: block;
	width: 30rpx;
	height: 30rpx;
}
.history{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 40rpx 20rpx;
	font-size: 30rpx;
	font-weight: bold;
}
.history-text{
	display: flex;
	flex-wrap: wrap;
	margin: 0 20rpx;
}
.history-text text{
	background-color: #f4f4f4;
	margin: 0 20rpx 20rpx 0;
	border-radius: 7rpx;
	padding: 10rpx 20rpx;
	font-size: 28rpx;
}

</style>
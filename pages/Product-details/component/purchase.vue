<template>
	<view class="purchase">
		<view class="flex-left"> 
			<button plain="true" open-type="share">
				<image src="/static/detail/fenxiang.svg" mode="aspectFit"></image>
				<text>分享</text>
			</button>
		</view>
		<view class="flex-left shopping-amount">
			<image src="/static/detail/gouwuche.svg" mode="aspectFit"></image>
			<text>购物车</text>
			<text class="amount">1</text>
		</view>
		<view class="flex-left" @click="toCollect(collection)">
			<image src="/static/detail/shoucang.svg" mode="aspectFit" v-if="collection <=0"></image>
			<image src="/static/detail/yishoucang.svg" mode="aspectFit" v-else></image>
			<text>{{collection > 0 ? '已收藏' : '收藏' }}</text>
		</view>
		<view v-if="whether" class="flex-right shopping-cart" @click="purChase('j_sho',sku_data)">加入购物车</view>
		<view v-if="whether" class="flex-right buy" @click="purChase('j_pur',sku_data)">立即购买</view>
		<!-- 库存不足 商品已下架 -->
		<view v-else class="flex-right buy">{{tips}}</view>
	</view>
</template>

<script setup>
	import {defineProps, reactive, watch,toRefs} from 'vue'
	let props = defineProps({goods_id:String,collection:Number,sku_data:Array,goods:Object});
	const result = reactive({collection:0,goods_id:'',whether:true,tips:'',goods:{}});
	const {collection,whether,tips} = toRefs(result);
	watch(props,(newVal,oldVal)=>{
		let {collection,goods_id,goods} = newVal;
		result.collection = collection;
		result.goods_id = goods_id;
		result.goods = goods;
		//判断商品是否已下架或商品库存足不足够
		if(goods.shelves === false){
			if(goods.stock <= 0){//商品下架以及库存不足
				result.whether = false;
				result.tips = '该商品已下架'
			}else{//商品下架以及库存足够
				result.whether = false;
				result.tips = '该商品已下架'
			}
		}else if(goods.stock <= 0){
			if(goods.shelves === false){//库存不足以及商品下架
				result.whether = false;
				result.tips = '该商品已下架'
			}else{
				result.whether = false;
				result.tips = '该商品已售完'
			}
		}
	})
	//收藏和取消收藏
	import {login_user} from '@/Acc-config/answer.js'
	import {Public} from '@/Acc-config/public.js'
	const db = wx.cloud.database();
	async function toCollect(n){
		const user = wx.getStorageSync('user_infor')//取出本地缓存的用户信息
		if(!user){login_user.show = true;return false}
		if(n === 0){//收藏
			try{
				await db.collection('collect_goods').add({data:{goods_id:result.goods_id}});
				result.collection++;
			}catch(e){
				new Plublic().toast('收藏失败');
			}
		}else{//取消收藏
			try{
				await db.collection('collect_goods').where({goods_id:result.goods_id}).remove();
				result.collection = 0;
			}catch(e){
				new Plublic().toast('取消收藏失败');
			}
		}
	}
	
	//分享
	import {onShareAppMessage} from '@dcloudio/uni-app'
	onShareAppMessage(()=>{
		return{
			title:result.goods.goods_title,
			path:`pages/Product-details/details?goods_id=${result.goods_id}`,
			imageUrl:result.goods.goods_cover
		}
	})
	//加入购物车或立即购买
	import {sku_popup} from '@/Acc-config/answer.js'
	function purChase(judge,sku){
		const user = wx.getStorageSync('user_infor')//取出本地缓存的用户信息
		if(!user){login_user.show = true;return false};
		if(sku.length > 0){//有规格
			sku_popup.show = true;
			sku_popup.judge = judge;
		}else{
			if(judge === 'j_sho'){
				//加入购物车
			}else{
				//直接下单
			}
		}
	}
</script>

<style scoped>
.purchase{
	height: 100rpx;
	background-color: #fefefe;
	border-top: 1rpx solid #e3e3e4;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom:68rpx;
}
.purchase image{
	width: 40rpx;
	height: 40rpx;
	display: block;
	padding-bottom: 8rpx;
}
.flex-left{
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 25rpx;
	color: #8a8b90;
}
.flex-left button{
	border: navajowhite;
	padding: inherit !important;
	margin: 0 !important;
	font-size: 25rpx !important;
	line-height: inherit !important;
	color: #8a8b90 !important;
}
.flex-right{
	flex: 2;
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
}
.shopping-cart{
	background-color: #fdf5f7;
	color: #ec697f;
	font-weight: bold;
}
.buy{
	background-color: #e9445a;
	color: #fefefe;
	font-weight: bold;
}
.shopping-amount{
	position: relative;
}
.amount{
	position: absolute;
	right: 0;
	top: -4rpx;
	background-color: #e9445a;
	color: #FFFFFF;
	width: 40rpx;
	height: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20rpx;
	border-radius: 50rpx;
}
</style>
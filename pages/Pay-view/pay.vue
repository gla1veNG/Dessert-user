<template>
	<!-- 收货地址 -->
	<view class="pay-address" v-for="(item,index) in address" :key="index" @click="choIce">
		<view class="pay-address-left">
			<image src="/static/detail/dingdan-dizhi.svg" mode="aspectFit"></image>
		</view>
		<view class="pay-address-name">
			<view>
				<text>{{item.name}}</text>
				<text>{{item.mobile}}</text>
			</view>
			<text>{{item.district + item.address}}</text>
		</view>
		<view class="pay-address-right">
			<image src="/static/detail/xiangyou-jiantou.svg" mode="aspectFit"></image>
		</view>
	</view>
	<!-- 商品详情 -->
	<view class="pay-goods" v-for="(item,index) in order" :key="index">
			<view>
				<image :src="item.goods_image" mode="aspectFill"></image>
			</view>
			<view style="width: 100%;">
				<text class="pay-goods-title">{{item.goods_title}}</text>
				<text class="pay-goods-specs"  v-if="item.specs.length > 0" v-for="(item_a,index_a) in item.specs" :key="index_a">{{item_a.att_val}}</text>
				<view class="pay-goods-price">
					<text>{{item.goods_price}}￥</text>
					<text v-if="type !='direct'">x{{item.buy_amount}}</text>
					<view v-else>
						<image src="/static/detail/jianshao.png" mode="aspectFit" @click="reDuce" :class="[item.buy_amount == 1 ? 'prevent_style' : '']"></image>
						<text>{{item.buy_amount}}</text>
						<image src="/static/detail/tianjia.png" mode="aspectFit" @click="plUs"></image>
					</view>
				</view>
			</view>
		</view>
	<!-- 支付按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="set-accounts">
		<view>{{total_price}}￥</view>
		<view @click="subMit">提交订单</view>
	</view>
</template>

<script setup>
	import {onMounted,reactive,toRefs,watch,onBeforeUnmount} from 'vue'
	import moment from 'moment'
	moment.locale('zh-cn');
	const db = wx.cloud.database();
	
	const re_data = reactive({address:[]});
	const {address} = toRefs(re_data);
	onMounted(async()=>{
		const res = await db.collection('re_address').where({tacitly:true}).get();
		re_data.address = res.data;
	})
	//跳转收货地址
	import {new_address} from '@/Acc-config/answer.js'
	function choIce(){
		wx.navigateTo({
			url:'/pages/Re-address/address'
		})
	}
	watch(new_address,(newVal,oldVal)=>{
		re_data.address = [newVal.data];
	})
	//接收上个页面传来的值
	import {onLoad} from '@dcloudio/uni-app'
	const or_data = reactive({order:[],type:'',total_price:0});
	const {order,type,total_price} = toRefs(or_data);
	onLoad((event)=>{
		const data = JSON.parse(event.order);
		or_data.order = data;
		or_data.type = event.type;
		//计算待支付的价格
		let sum = 0;
		or_data.order.forEach(item=>sum += item.subtotal);
		or_data.total_price = parseFloat((sum).toFixed(10));
	})
	//减数量
	function reDuce(){
		or_data.order[0].buy_amount--;
		or_data.order[0].subtotal = parseFloat((or_data.order[0].goods_price * or_data.order[0].buy_amount).toFixed(10));
		or_data.total_price = or_data.order[0].subtotal;
	}
	//加数量
	function plUs(){
		or_data.order[0].buy_amount++;
		or_data.order[0].subtotal = parseFloat((or_data.order[0].goods_price * or_data.order[0].buy_amount).toFixed(10));
		or_data.total_price = or_data.order[0].subtotal;
	}
	//提交订单
	import {outTradeno,coDe} from '@/Acc-config/orde_number.js'
	import {Wxpay} from '@/Acc-config/wx-pay.js'
	async function subMit(){
			if(re_data.address.length === 0){
				new Plublic().toast('请选择收货地址')
				return false
			}
			wx.showLoading({title: '正在下单',mask:true})
			// 当前时间:年月日，时分秒
			let time = moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
			// 当前时间：年月日
			let query_time = moment().utcOffset(8).format('YYYY-MM-DD')
			// 对每个商品生成订单编号
			or_data.order.forEach(item=>item.order_number = coDe())
			let out_trade_no = outTradeno()
			try{
				// 2.提交订单到数据库
				const can_res = await new Wxpay().suBmit(or_data.order,re_data.address,time,query_time,out_trade_no)
				result.out_trade_no = out_trade_no
				result.or_data = or_data.order
				// 弹出支付弹窗
				wx.hideLoading()
				show.value = true
			}catch(err){
				// 支付发生错误
				new Plublic().toast('支付发生错误')
				await db.collection('order_data').where({out_trade_no}).remove()
			}
		}
		// 确认支付
		async function confirmPayment(){
			loadIng.value = true
			// 1.支付成功更改订单字段为成功，跳转订单页面
			await new Wxpay().staTe('success',result.out_trade_no)
			// 2.支付成功：库存自减，售出自增
			await new Wxpay().resTock(result.or_data)
			// 3.如果购物车的下单商品数据要删除
			if(or_data.type == 'cart'){
				let cart = await new Wxpay().deleteCart(result.or_data)
			}
			loadIng.value = false
			show.value = false
			// 跳转订单界面
			wx.redirectTo({url:'/pages/All-orders/order'})
		}
		
		// 取消支付
		async function cancelPayment(){
			// 取消支付
			if(or_data.type == 'cart'){
				let cart = await new Wxpay().deleteCart(or_data.order)
			}
			show.value = false
			// 跳转订单界面
			wx.redirectTo({url:'/pages/All-orders/order'})
		}
		onBeforeUnmount(()=>{show.value = false})
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
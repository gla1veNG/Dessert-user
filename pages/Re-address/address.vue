<template>
	<view class="Re-view" v-for="(item,index) in address" :key="index">
		<view class="Re-address Re-flex" @click="choIce(item)">
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
		<view class="Re-flex" :class="[item.tacitly ? 'Disable' : '']" @click="setUp(item._id,index)">
			<icon class="icon-small" type="success" size="23" v-if="item.tacitly"></icon>
			<text class="Defa-padd">{{item.tacitly ? '已设为默认' : '设为默认'}}</text>
		</view>
		<view class="Re-flex">
			<text @click="deleTe(item._id,index)">删除</text>
			<text class="Defa-padd" @click="modIfy(item,item._id)">修改</text>
		</view>
	</view>
</view>
<!-- 没有数据的提示 -->
<view class="Tips" v-if="address.length === 0">您还没有收货地址</view>
<!-- 底部 -->
<view style="height: 300rpx;"></view>
<view class="New-address" @click="newAddress">+ 新建地址</view>
<!-- 弹窗 -->
<Address @upLoad="upLoad"/>
</template>

<script setup>
	import Address from '@/pages/Re-address/component/new-address.vue'
	import {show,modify,deci,new_address} from '@/Acc-config/answer.js'
	import {onMounted,reactive,toRefs} from 'vue'
	const db = wx.cloud.database();
	
	
	//请求数据
	onMounted(()=>{getAdd()});
	const data = reactive({address:{}});
	const {address} = toRefs(data);
	async function getAdd(){
		const res = await db.collection('re_address').get();
		data.address = res.data;
	}
	//弹窗组件提交数据成功时触发
	function upLoad(){
		getAdd();
	}
	//删除地址
	import {Public} from '@/Acc-config/public.js'
	function deleTe(_id,index){
		wx.showModal({
			title:'确认删除吗',
		})
		.then(async (res)=>{
			if(res.confirm){
				try{
					await db.collection('re_address').doc(_id).remove();
					data.address.splice(index,1);
				}catch(e){
					new Public().toast('删除失败');
				}
			}
		})
	}
	//修改地址
	function modIfy(item,id){
		modify.data = item;
		modify.id = id;
		show.value = true;
		deci.value = '001';//'001'是修改
	}
	//调用弹窗新建地址
	function newAddress(){
		show.value = true;
		deci.value = '002';//'002'是新建地址
	}
	//设置默认地址
	async function setUp(id,index){
		let sto = [];
		data.address.forEach((item,index_a)=>{
			if(item.tacitly){
				sto.push({index:index_a,id:item._id})
			}
		})
		try{
			await db.collection('re_address').doc(id).update({data:{tacitly:true}});
			data.address[index].tacitly = true;
			if(sto.length >0){
				await db.collection('re_address').doc(sto[0].id).update({data:{tacitly:false}});
				data.address[sto[0].index].tacitly = false;
			}
		}catch(e){
			new Public().toast('设置失败')
		}
	}
	//选择地址传值返回上一页
	function choIce(item){
		new_address.data = item;
		wx.navigateBack({
			delta:1
		})
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
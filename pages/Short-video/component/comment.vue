<template>
	<page-container :show="comment_show.show" position="bottom" bindenter="onEnter">
		<view class="space-view">
			<view class="chacha" @click="comment_show.show = false">
				<image src="/static/detail/guanbi.svg" mode="aspectFit"></image>
			</view>
			<scroll-view :scroll-y="true" :show-scrollbar="false" :enhanced="true">
				<view class="messages-views" v-for="(item,index) in comment" :key="index">
					<view class="messages-name">
						<image :src="item.avatarurl" mode="aspectFill"></image>
						<view class="nickname">{{item.nickname}}</view>
						<view class="times">{{item.time}}</view>
					</view>
					<view class="messages-title">{{item.content}}</view>
				</view>
				<!-- 没有评论的提示 -->
				<view class="Tips" v-if="comment.length === 0">暂无评论</view>
			</scroll-view>
			<!-- 评论框 -->
			<view class="Comment-box">
				<view class="Comment-box-input">
					<input type="text" v-model="content" placeholder="留下你的评论" confirm-type="send" cursor-spacing="50"/>
				</view>
				<view class="send-out" @click="sEnd">发送</view>
			</view>
		</view>	
	</page-container>
</template>

<script setup>
	import {watch,reactive,toRefs} from 'vue';
	function onEnter(){}
	import {comment_show} from '@/Acc-config/answer.js'
	import moment from 'moment'
	moment.locale('zh-cn');
	const db = wx.cloud.database();
	
	//监听父组件传值拉起评论框，请求数据
	watch(comment_show,(newVal,oldVal)=>{
		if(newVal.show && comment_show.num === 2){
			relation.goods_id = comm_data.goods_id;
			called();
		}
	})
	//请求评论数据
	function called(){
		console.log('9999');
	}
	//评论的数据
	const comm_data = reactive({
		content:'',
		comment:[]
	})
	const {content,comment} = toRefs(comm_data);
	// 提交评论
	import {login_user} from '@/Acc-config/answer.js'
	import {Public} from '@/Acc-config/public.js'
	
	const relation = reactive({goods_id:''});
	async function sEnd(){
		if(comm_data.content.split(" ").join("").length === 0){return false}
		const user = wx.getStorageSync('user_infor')//取出本地缓存的用户信息
		if(!user){login_user.show = true;return false;}
		let time = moment().utcOffset(8).format('YYYY-MM-DD');
		const obj = 
			{
				avatarurl:user.avatarurl,
				nickname:user.nickname,
				time,
				content:comm_data.content,
				goods_id:relation.goods_id
			}
			try{
				await db.collection('video_comment').add({data:obj});
				comm_data.content = '';
				comm_data.comment.unshift(obj);
			}catch(e){
				new Public().toast('评论失败');
			}
	}
</script>

<style scoped>
.chacha{
	height: 30rpx;
	display: flex;
	justify-content: flex-end;
}
.chacha image{width: 30rpx; height: 30rpx;}
.scroll-hi{height: 1000rpx;}
/* 评论内容 */
.messages-views{
	margin: 20rpx 0;
}
.messages-name image{
	width: 60rpx; height: 60rpx;
	border-radius: 50%;
}
.messages-name{
	display: flex;
	align-items: center;
	height: 60rpx;
}
.nickname{
	flex: 1;
	color: #8a8b90;
	font-size: 30rpx;
	padding-left: 15rpx;
}
.times{
	color: #b0afb4;
	font-size: 25rpx;
}
.messages-title{
	font-size: 30rpx;
	padding-left: 75rpx;
	line-height: 1.4;
	margin: 20rpx 0;
}
/* 固定底部的评论框 */
.Comment-box{
	background-color: #f7f7f7;
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 10rpx;
	display: flex;
	align-items: center;
	font-size: 27rpx;
	z-index: 99;
	padding-bottom: 68rpx;
}
.Comment-box-input{
	background-color: #FFFFFF;
	border-radius: 10rpx;
	height: 80rpx;
	flex: 1;
}
.Comment-box-input input{
	padding: 0 15rpx;
	height: 80rpx;
}
.send-out{
	background-color: #07c160;
	color: #FFFFFF;
	height: 80rpx;
	line-height: 80rpx;
	width: 150rpx;
	text-align: center;
	border-radius: 10rpx;
	margin-left: 10rpx;
}
.detail-page button{
	margin: 70rpx;
	width: 400rpx;
}
.detail-page{
	position:absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.space-view{
	height: 1050rpx;
	padding-bottom: 30rpx;
	background: #fefefe;
	/* z-index: 999;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0; */
	overflow-y:auto;
	padding: 20rpx;
}
.Tips{
	text-align: center;
	padding-top: 100rpx;
	color: #cccccc;
}
</style>
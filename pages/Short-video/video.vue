<template>
	<view class="video-return">
		<view :style="'height:' + S_top + 'px;'"></view>
		<view class="video-return-img" :style=" 'height:' + S_height + 'px;' ">
			<view>
				<image src="/static/detail/video-fanhui.svg" mode="aspectFit"></image>
			</view>
		</view>
	</view>
	<view :style=" 'height:' + winheight + 'px;'" class="trim-video">
		<!-- 短视频 -->
		<video id="myVideo" :style=" 'height:' + winheight + 'px;'" src="#" 
		:controls="false" 
		:loop="true" 
		:show-center-play-btn="false" 
		:autoplay="true" object-fit="cover" 
		picture-in-picture-mode="{{['push', 'pop']}}"
		bindenterpictureinpicture="bindenter"
		@play="playFun"
		@oause="pauseFun"
		></video>
		<view class="all-round" @click="allRound"></view>
		<!-- 自定义播放按钮 -->
		<view class="video-img" @click="videoPlay" v-show="startVideo">
			<image src="/static/detail/video-bofang.svg" mode="aspectFit"></image>
		</view>
		<!-- 底部操作按钮 -->
		<view class="advert-left">
			<view class="goods-det">
				<image src="/static/detail/shuxing-img.png" mode="aspectFill"></image>
				<view class="goods-price">
					<text>1.2</text>
					<text>抢</text>
				</view>
			</view>
			<view class="goods-title overflow">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
		</view>
		<!-- 右边的评论等等 -->
		<view class="user-right">
			<view class="give-thethu">
				<view><image src="/static/detail/video-pinglun.svg" mode="aspectFit"></image></view>
				<view>评论</view>
			</view>
			<view class="give-thethu comment">
				<view><image src="/static/detail/video-shoucang.svg" mode="aspectFit"></image></view>
				<!-- <view><image src="/static/detail/video-yishoucang.svg" mode="aspectFit"></image></view> -->
				<view>收藏</view>
			</view>
			<view class="give-thethu">
				<button open-type="share" plain="true">
					<view><image src="/static/detail/video-fenxiang.svg" mode="aspectFit"></image></view>
					<view>分享</view>
				</button>
			</view>
		</view>
	</view>
	<!-- 评论组件 -->
	<Comment/>
</template>

<script setup>
	import {onMounted,reactive,toRefs} from 'vue'
	import Comment from '@/pages/Short-video/component/comment.vue'
	
	function bindenter(){}
	
	//获取胶囊按钮坐标数据
	const search_data = reactive({
		S_height:0,
		S_top:0,
		winheight:0,
		videoplay:{},
		startVideo:true
	})
	
	const {S_height,S_top,winheight,startVideo} = toRefs(search_data);
	onMounted(()=>{
		const but_data = wx.getMenuButtonBoundingClientRect();
		search_data.S_height = but_data.height;
		search_data.S_top = but_data.top;
		//获取手机屏幕宽高
		search_data.winheight = wx.getSystemInfoSync().screenHeight;
		//获取视频的上下文
		search_data.videoplay = wx.createVideoContext('myVideo');
	})
	// 继续播放触发
	function playFun(){
		startVideo.value = false;
	}
	// 暂停播放时触发
	function pauseFun(){
		startVideo.value = true;
	}
	//触发播放
	function videoPlay(){
		search_data.videoplay.play();
		startVideo.value = false;
	}
	//暂停播放或者继续播放
	function allRound(){
		startVideo.value = search_data.startVideo ? false  : true ;
		if(startVideo.value){
			// 暂停播放
			search_data.videoplay.pause();	
		}else{
			// 继续播放
			search_data.videoplay.play();
		}
	}
</script>

<style scoped>
.video-return{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
}
.video-return-img view{
	width: 50rpx;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
}
.video-return-img image{
	width: 50rpx;
	height: 50rpx;
	display: block;
}
/* 视频 */
.trim-video{
	width: 100%;
	position: relative;
	overflow: hidden;
}
.trim-video video{
	width: 100%;
}
/* 透明覆盖 */
.all-round{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.01);
}
/* 自定义按钮 */
.video-img image{
	width: 110rpx;
	height: 110rpx;
	z-index: 999;
	/* border: 2px solid #FFFFFF;
	border-radius: 50%; */
}
.video-img{
	width: 110rpx;
	height: 110rpx;
	position: absolute;
	bottom: 0;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
}
/* 详情页和标题 */
.advert-left{
	position: absolute;
	left: 20rpx;
	bottom: 85rpx;
}
.goods-det{
	/* height: 170rpx; */
	width: 300rpx;
	background-color: red;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
}
.goods-det image{
	height: 120rpx;
	width: 300rpx;
	display: block;
	border-top-left-radius: 10rpx;
	border-top-right-radius: 10rpx;
}
.goods-price text{display: block;}
.goods-price{
	display: flex;
	/* align-items: center; */
	justify-content: space-between;
	padding: 9rpx 10rpx;
	font-size: 27rpx;
	color: #FFFFFF;
	font-weight: bold;
}
.goods-title{
	width: 500rpx;
	line-height: 1.5;
	font-size: 30rpx;
	color: #FFFFFF;
}
/* 右边用户操作 */
.user-right{
	position: absolute;
	right: 20rpx;
	bottom: 85rpx;
	width: 100rpx;
	font-size: 25rpx;
	color: #FFFFFF;
}
.user-right image{
	width: 55rpx;
	height: 55rpx !important;
}
.give-thethu{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.give-thethu button{
	border: navajowhite;
	padding: inherit !important;
	margin: 0 !important;
	font-size: 25rpx !important;
	line-height: inherit !important;
	color: #FFFFFF !important;
}
.comment{margin: 60rpx 0;}
.overflow{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
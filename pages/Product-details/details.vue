<template>
	<!-- 导航栏 -->
	<view class="search-back" :style="{opacity:styleOpacity}" v-show="being">
		<view :style=" 'height:' + S_top + 'px;' "></view>
		<view class="search-input" :style=" ['height:' + S_height + 'px;','padding-right:' + S_width + 'px;'] ">
			<view class="tab-jiantou">
				<image src="/static/detail/fanhuijiantou.svg" mode="aspectFit"></image>
			</view>
			<view class="tab-view" v-for="(item,index) in tab_name" :key="index" :style=" 'height:' + S_height + 'px;' " @click="swItch(index)">
				<text>{{item}}</text>
				<text :class="{active:index === trigger}"></text>
			</view>
		</view>
	</view>
	<!-- 轮播 -->
	<Swipers id="select" class="swiper"/>
	<!-- 评价 -->
	<Eva id="select" class="eva"/>
	<!-- 详情 -->
	<Img id="select" class="img"/>
</template>

<script setup>
	import {reactive,toRefs,onMounted,ref} from 'vue'
	import Swipers from '@/pages/Product-details/component/swiper.vue'
	import Eva from '@/pages/Product-details/component/evaluate.vue'
	import Img from '@/pages/Product-details/component/image.vue'
	//顶部导航栏
	const search_data = reactive({
		tab_name:['商品','评价','详情'],
		S_height:0,
		S_top:0,
		S_width:0,
		Custom_height:0,
		being:true,//显示隐藏导航栏
		styleOpacity:0,//tab透明度
		trigger:0,//导航栏的下划线	
	})
	const {tab_name,S_height,S_top,S_width,Custom_height,being,styleOpacity,trigger} = toRefs(search_data);
	
	//获取胶囊按钮坐标数据
	onMounted(()=>{
		const but_data = wx.getMenuButtonBoundingClientRect();
		search_data.S_height = but_data.height;
		search_data.S_top = but_data.top;
		search_data.S_width = but_data.width;
		search_data.Custom_height = but_data.height + but_data.top;
	})
	
	// 获取轮播，评价，详情每个组件的高度
	let heightset = reactive({hei:[]}) 
	function viewheight(){
			const query = wx.createSelectorQuery();
			query.selectAll('#select').boundingClientRect();
			query.exec(res=>{
				heightset.hei.push(res[0][0].height - search_data.Custom_height);
				heightset.hei.push(heightset.hei[0] + res[0][1].height); 
				heightset.hei.push(heightset.hei[1] + res[0][2].height); 
			})
		}
		//滚动监听
		import {onLoad,onPageScroll} from '@dcloudio/uni-app'
		onPageScroll((e)=>{
			search_data.styleOpacity = e.scrollTop / 300;//导航栏渐隐渐显
			search_data.being = e.scrollTop === 0 ? false : true;
			let scrollTop = e.scrollTop;
			if(scrollTop >= heightset.hei[search_data.trigger]){
				//上拉
				search_data.trigger += 1;
			}else if(scrollTop < heightset.hei[search_data.trigger - 1]){
				//下拉
				search_data.trigger -= 1;
			}
		})
		//点击tab跳转指定组件
		function swItch(index){
			const cls = index == 0 ? '.swiper' : index == 1 ? '.eva' : '.img'
			const query = wx.createSelectorQuery();
			query.select(cls).boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(res=>{
				wx.pageScrollTo({
					scrollTop: res[0].top + res[1].scrollTop - search_data.Custom_height,
					duration: 300
				})
				setTimeout(()=>{search_data.trigger = index},500);
			})
		}
		onLoad((event)=>{
			console.log(event);
			viewheight();
		})
</script>

<style>
page{background-color: #f6f6f6;}
.search-back{
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
}
.search-input{
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.tab-jiantou{
	width: 50rpx;
	height: 50rpx;
}
.tab-jiantou image{
	width: 50rpx;
	height: 50rpx;
}
.tab-view{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.tab-view text:nth-child(2){
	width: 30rpx;
	height: 10rpx;
	border-radius: 10rpx;
	position: absolute;
	bottom: 0;
}
.active{
	background-color: #f67319;
}
</style>
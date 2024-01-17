// 商品详情页各组件间传值
import {reactive} from 'vue'

const ORDER = reactive({
	order:{
		goods_id:'',//商品id
		goods_image:'',//商品图片
		goods_title:'',//商品标题
		goods_price:0,//商品价格
		buy_amount:0,//购买数量
		specs:[],//规格
		subtotal:0,//总价
		select:false,//购物车是否选中
	},
	exist:false,//判断是是否存在秒杀或者秒杀开始或结束
	nu_sh_cart:0,//购物车数量
})
//加入购物车
const db = wx.cloud.database();
const SHCART = function(){
	let subtotal = ORDER.order.goods_price * ORDER.order.buy_amount;
	console.log(subtotal);
}
export {ORDER,SHCART}
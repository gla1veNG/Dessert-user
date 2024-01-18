//一些公用的响应式传值
import {reactive, ref} from 'vue'
//用户没有登录，传值，调出登录框
let login_user = reactive({show:false,response:'fail'});

//短视频组件里点击评论按钮，拉出评论框
let comment_show = reactive({show:false,num:1,goods_id:''});

//详情页点击底部加入购物车或购买拉起sku弹窗
let sku_popup = reactive({show:false,judge:''});//judge是为了判断点击了哪个

//收货地址页面父组件调用子组件弹窗
let show = ref(false);

//收货地址页面,父组件用户修改地址传值到子组件
let modify = reactive({data:[],id:''});

//收货地址页面,判断用户是新建地址还是修改地址
let deci = ref('001');

//收货地址页面,选择地址传值返回上一页
let new_address = reactive({data:[]});
export {login_user,comment_show,sku_popup,show,modify,deci,new_address};
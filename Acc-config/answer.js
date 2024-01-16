//一些公用的响应式传值
import {reactive} from 'vue'
//用户没有登录，传值，调出登录框
let login_user = reactive({show:false,response:'fail'});

//短视频组件里点击评论按钮，拉出评论框
let comment_show = reactive({show:false,num:1,goods_id:''});

//详情页点击底部加入购物车或购买拉起sku弹窗
let sku_popup = reactive({show:false,judge:''});//judge是为了判断点击了哪个
export {login_user,comment_show,sku_popup};
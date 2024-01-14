//一些公用的响应式传值
import {reactive} from 'vue'
//用户没有登录，传值，调出登录框
let login_user = reactive({show:false,response:'fail'});

//短视频组件里点击评论按钮，拉出评论框
let comment_show = reactive({show:false,num:1,goods_id:''})

export {login_user,comment_show};
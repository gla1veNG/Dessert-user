//一些公用的响应式传值
import {reactive} from 'vue'
//用户没有登录，传值，调出登录框
let login_user = reactive({show:false,response:'fail'});

export {login_user};
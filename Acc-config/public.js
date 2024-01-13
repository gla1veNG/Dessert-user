class Public{
	constructor(){}
	// 登录
	login(){
		return new Promise((resolve,reject)=>{
			wx.getUserProfile({
				desc:'获取用户信息'
			})
		})
	}
}
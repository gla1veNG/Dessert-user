const db = wx.cloud.database();
class Public{
	constructor(){}
	// 登录
	login(){
		return new Promise((resolve,reject)=>{
			wx.getUserProfile({
				desc:'获取用户信息',
				success:async(res)=>{
					console.log(res);
					//存储数据库查询数据库是否存在用户信息，不存在则提交
					const query_openid = await db.collection('user_infor').get();
					if(query_openid.data.length >0){
						//存在用户信息
						const user = query_openid.data[0];
						wx.setStorageSync('user_infor',{avatarUrl:user.avatarUrl,nickName:user.nickName,openid:user._openid});
					}else{
						await db.collection('user_infor').add({data:{avatarUrl:res.userInfo.avatarUrl,nickName:res.userInfo.nickName,watch_num:1,pay:true}})
						const query = await db.collection('user_infor').get();
						const user = query.data[0];
						wx.setStorageSync('user_infor',{avatarUrl:user.avatarUrl,nickName:user.nickName,openid:user._openid});
					}
					resolve('success')
				},
				fail:(err)=>{
					reject(err);
				}
			})
		})
	}
	//消息提示框
	toast(title,icon="none") {
		wx.showToast({
			title,
			icon,
			mask: true,
			duration: 800
		})
	}
}

export {Public}
class Wxpay{
	//请求云函数：获取统一下单返回的数据
	async pLace(price,outTradeno){
		try{
			const res = await wx.cloud.callFunction({name:'wx-pay',data:{price,outTradeno}});
			return res
		}catch(err){
			return {msg:'请求统一下单云函数出错',err}
		}
	}
}
export {Wxpay}
/* 快递100的账号配置 */

const URL = 'https://poll.kuaidi100.com/poll/query.do'
const KEY = 'AWRnqcrx8643'
const CUSTOMER = 'B5FDF1FC50CDDC89312761D9B0C8FC6A'

// 快递公司
const KUAIDI = [
	{
		name:'圆通速递',
		com:'yuantong',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/yuantong.jpg'
	},
	{
		name:'韵达快递',
		com:'yunda',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/yunda.jpg'
	},
	{
		name:'中通快递',
		com:'zhongtong',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/zhongtong.jpg'
	},
	{
		name:'邮政快递',
		com:'youzhengguonei',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/youzheng.jpg'
	},
	{
		name:'申通快递',
		com:'shentong',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/shentong.png'
	},
	{
		name:'顺丰速运',
		com:'shunfeng',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/shunfeng.jpg'
	},
	{
		name:'EMS',
		com:'ems',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/ems.png'
	},
	{
		name:'京东物流',
		com:'jd',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/jd.jpg'
	},
	{
		name:'极兔速递',
		com:'jtexpress',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/jitu.png'
	},
	{
		name:'百世快递',
		com:'huitongkuaidi',
		logo:'https://qita-1252107261.cos.ap-chengdu.myqcloud.com/kuaidi/baishi.jpg'
	}
]

export {URL,KEY,CUSTOMER,KUAIDI}
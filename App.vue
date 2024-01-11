<script>
	export default {
		onLaunch: function() {
			wx.cloud.init({
				env:'dessert-user-2gv61nata72c4681',
				traceUser:true
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

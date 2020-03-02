<script>
export default {
	onLaunch: function() {
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力');
		} else {
			wx.cloud.init({
				env: 'test-01-nkmqa',
				traceUser: true
			});
		}
	}
};
</script>

<style>
/*隐藏横向滚动条*/
::-webkit-scrollbar{
	width: 0;
	height: 0;
	color: transparent;
}
</style>

<template>
	<view class="loadmin">
		<view class="home-load">
			<image src="../static/homeload.svg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.home-load image{
		width: 200rpx;
		height: 200rpx;
		background: rgba(0,0,0,0.2);
		border-radius: 10rpx;
	}
	.home-load {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.loadmin {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		overflow: hidden;
		background: rgba(242,243,244,0.6);
	}
</style>

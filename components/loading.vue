<template>
	<view>
		<view class="loading">
			<view class="loader"></view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.loading {
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
	}
	.loader {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		color: inherit;
		border: 7rpx solid greenyellow;
		border-bottom-color: transparent;
		border-radius: 50%;
		animation: 1s loader linear infinite;
	}
	@keyframes loader{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>

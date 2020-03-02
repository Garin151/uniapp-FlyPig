<template>
	<view>
		<view class="ticket">
			<block v-for="(item,index) in tickets" :key="index">
				<view>
					<image class="ticket-img" :src="item.image" mode="widthFix"></image>
					<text class="ticket-text">{{item.name}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ticket',
	data() {
		return {
			tickets: [
				{
					image: 'http://gw.alicdn.com/tfs/TB1DoXFwHsrBKNjSZFpXXcXhFXa-210-126.png_110x10000.jpg',
					name: '机票'
				},
				{
					image: 'http://gw.alicdn.com/tfs/TB1s51ECuOSBuNjy0FdXXbDnVXa-210-126.png_110x10000.jpg',
					name: '酒店'
				},
				{
					image: 'http://gw.alicdn.com/tfs/TB1BNE_wrZnBKNjSZFrXXaRLFXa-210-126.png_110x10000.jpg',
					name: '火车票'
				},
				{
					image: 'http://gw.alicdn.com/tfs/TB1pN01wsUrBKNjSZPxXXX00pXa-210-126.png_110x10000.jpg',
					name: '汽车票'
				},
				{
					image: 'http://gw.alicdn.com/tfs/TB1VZqNCuSSBuNjy0FlXXbBpVXa-210-126.png_110x10000.jpg',
					name: '门票'
				}
			]
		};
	}
};
</script>

<style>
.ticket-img {
	width: 90rpx;
	height: 90rpx;
}
.ticket {
	display: flex;
	justify-content: space-around;
	text-align: center;
	margin: 30rpx 0;
}
.ticket-text {
	font-size: 30rpx;
	display: block;
}
</style>

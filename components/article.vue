<template>
	<view class="active">
		<view class="conteng">
			<block v-for="(item,index) in Articleend" :key="index">
				<view class="conteng-article" @click="localCont()">
					<view class="conteng-img">
						<image :src="item.image" mode="aspectFill" lazy-load></image>
					</view>
				<!-- 文字介绍 -->
					<view class="active-inroduce">
						<view class="active-name">{{item.title}}</view>
						<view class="active-title">{{item.list}}</view>
						<view class="active-label">{{item.label}}</view>
						<view class="purchase">
							<text class="active-price">￥{{item.price}}</text>
							<text class="active-purchase">{{item.buy}}人已购</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default{
		name:"article",
		props:{
			Articleend:Array
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style scoped>
	@import "../common/uni.css"
</style>

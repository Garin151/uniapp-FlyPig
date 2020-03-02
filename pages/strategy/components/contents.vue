<template>
	<view class="active">
		<view class="conteng">
			<block v-for="(item,index) in sql_list" :key="index">
				<view class="conteng-article" @click="localCont(item._id)">
					<view class="conteng-img">
						<block v-for="(item,index) in item.topimg" :key="index" v-if="index == 0">
							<image :src="item" mode="aspectFill" lazy-load></image>
						</block>
					</view>
				<!-- 文字介绍 -->
					<view class="active-inroduce">
						<view class="active-name">{{item.titledata}}</view>
						<view class="active-title">{{item.tipsdata}}</view>
					</view>
						<view class="purchase-userinfo">
							<image :src="item.avatarUrl" mode="widthFix"></image>
							<text class="active-purchase">{{item.nickName}}</text>
						</view>
				</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default{
		name:"contents",
		props:{
			sql_list:Array
		},
		
		data() {
			return {
				
			}
		},
		
		methods:{
			localCont(id) {
				//console.log(id)
				uni.navigateTo({
					url:"../detail/detail?id=" +id
				})
			}
 		},
		
		
		
	}
</script>

<style scoped>
	@import "../../../common/uni.css";
	.purchase-userinfo image{
		width: 50rpx;
		height: 50rpx;
		border-radius: 50rpx;
	}
	.purchase-userinfo text{
		padding-left: 20rpx;
	}
	.purchase-userinfo {
		padding-top: 20rpx;
	}
</style>

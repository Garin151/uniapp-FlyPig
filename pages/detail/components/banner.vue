<template>
	<view>
			<!-- banner -->
			<view class="banner-posi">
				<view>
					<swiper  :interval="3000" :duration="1000" :circular="true" @change="bannerNum">
						<block v-for="(item,index) in imgArray" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<image :src="item" mode="aspectFill" class="imageurl" @click="preImage(index)"></image>
							</view>
						</swiper-item>
						</block>
					</swiper>
				</view>
				<!-- 轮播数字 -->
				<view class="banner-num">
					<text>{{imgNumber + add}}</text>
					<text>/{{imgArray.length}}</text>
				</view>
			</view>
			
				<!-- 标题 -->
				<view class="cont-back">
					<text class="title-con" space="ensp" :selectable="true">{{detailData}}</text>
					<!-- 销量之类 -->
					<view class="volume">
						<text>5分 超出预期</text>
						<text>评论{{leaveword.length}}条</text>
						<text>月销100笔</text>
					</view>
				</view>
			
		</view>
</template>

<script>
export default {
	name:"D_banner",
	
	props:{
		imgArray:Array,
		detailData:String,
		leaveword:Array
	},
	
	data() {
		return {
			imgNumber:0,
			add:1
		}
	},
	
	methods:{
		bannerNum(event) {
			//console.log(event.detail.current)
			this.imgNumber = event.detail.current
		},
		
		preImage(index) {
			//console.log(index)
			uni.previewImage({
				current:index,
				urls:this.imgArray
			})
			.then(res =>{
				//console.log("预览成功")
			}).catch(err =>{
				console.log("预览失败")
			})
		
		}
		
		
	}
}
</script>

<style>
	
		/* 轮播 */
		.imageurl{width: 100%; height: 500upx !important;}
		swiper{height: 500upx !important;}
		.banner-num{background: #333333; width: 100upx; color: #ffffff; text-align: center;
		border-radius: 15upx;
		font-size: 25upx;
		height: 40upx;
		line-height: 40upx;
		position: absolute;
		right: 20upx;
		bottom: 20upx;}
		.banner-posi{position: relative; height: 500upx;}
		/* 标题 */
		.cont-back{padding: 20upx; background: #FFFFFF;}
		.title-con{color: #333333; font-size: 35upx; font-weight: bold; line-height: 1.5;
		 padding-bottom: 30upx;max-width: 100%;}
		 /* 销量之类 */
		 .volume{font-size: 25upx; color: #999999;
				display: flex; justify-content:space-between;}
		 .volume text{display: block;}
</style>

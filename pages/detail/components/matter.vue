<template>
	<view>
			<!-- 图片视频介绍 -->
			<view class="cont-introduce cont-back">
				<view class="img-video">图片视频介绍</view>
				<view>
					<video objectFit="fill" :src="videoData" enable-play-gesture="true" v-if="videoShow"></video>
					<view>
						<block v-for="(item,index) in imgArray" :key="index">
							<image :src="item" mode="widthFix"></image>
						</block>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
export default {
	name:"D_matter",
	
	props:{
		videoData:String,
		imgArray:Array
	},
	
	data() {
		return {
			videoShow: false
		}
	},
	
	watch:{
		videoData(newData,oldData) {
			if(newData != ""){
				this.videoShow = true
				//console.log("有视频")
			}else{
				//console.log("没有视频")
				this.videoShow = false
			}
		}
	}
}
</script>

<style scoped>
/* 图文视频 */
	.cont-back{padding: 20upx; background: #FFFFFF;}
	.cont-introduce{margin-top: 20upx;}
	.img-video{color: #333333; font-size: 30upx; font-weight: bold; padding: 20upx 0;}
	.cont-introduce video,image{width: 100%;}
	.cont-introduce video{margin-bottom: 20upx;}
</style>

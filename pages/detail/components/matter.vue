<template>
	<view>
			<!-- 图片视频介绍 -->
			<view class="cont-introduce cont-back">
				<view class="img-video">图片视频介绍</view>
				<view>
					<view class="uploadvideo">
						<video objectFit="cover" :src="videoData" enable-play-gesture="true" v-if="videoShow"></video>
					</view>
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
	/* 视频 */
	.uploadvideo video {
		width: 100%;
		height: 400upx;
		border-radius: 5upx;
	}
	.uploadvideo {
		margin: 0 8px;
		border-radius: 5upx;
		position: relative;
	}
/* 图文视频 */
	.cont-back{padding: 20upx; background: #FFFFFF;}
	.cont-introduce{margin-top: 20upx;}
	.img-video{color: #333333; font-size: 30upx; font-weight: bold; padding: 20upx 0;}
	.cont-introduce video,image{width: 100%;}
	.cont-introduce video{margin-bottom: 20upx;}
</style>

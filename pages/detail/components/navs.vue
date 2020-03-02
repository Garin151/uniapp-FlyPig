<template>
	<view>
		<view class="navs">
			<block v-for="(item,index) in navsData" :key="index">
				<text :class="{activetext:index == num}" @click="ChooseTar(index)">{{item.name}}</text>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	name:"navs",
	data() {
		return {
			num:0,
			navsData: [
				{
					"name":"宝贝"
				},
				{
					"name":"详情"
				},
				{
					"name":"评价"
				}
			]
		}
	},
	
	methods:{
		ChooseTar(index) {
			this.num = index
			if(index == 0){
				this.ScrollTo(0)
			}else if(index == 1){
				this.ScrollTo(300)
			}else {
				this.ScrollTo(1400)
			}
		},
		
		ScrollTo(distance) {
			uni.pageScrollTo({
				scrollTop:distance
			})
		}
		
		
		
	},
	
	
	
	
}
</script>

<style scoped>
	.navs text{
		display: block; 
		font-size: 30upx; 
		width: 100upx; 
		text-align: center; 
		color: #464230;
		}

	.navs{
		display: flex; 
		justify-content: center; 
		height: 35px; 
		line-height: 35px; 
		padding: 5upx 0;
		}
	.activetext{
		border-bottom: 6upx solid #3d3b32;
		}
</style>

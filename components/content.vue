<template>
	<view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view>
				<block v-for="(item,index) in tab" :key="index">
					<view @click="choose(index,item.nav)" class="list-cont" :class="{ active:index == num}">
						<view>
							<text :class="{activea:index ==num}" class="con-text-a">{{item.name}}</text>
						</view>
						<view>
							<text :class="{activea:index ==num}" class="con-text-b">{{item.title}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {request_02} from "../common/cloudFunctioin.js"
export default{
	name:"content",
	props:{
		tab:Array
	},
	data() {
		return {
			num:0,
			
		}
	},
	methods:{
		choose(index,nav) {
			this.num = index
			let pageid = 0
			let uniload = false
			let loading = true
			let loading_01 = true
			let nonedata = false
			let pullobj = {
				loading:loading,
				nav:nav,
				pageid:pageid,
				uniload:uniload,
				nonedata:nonedata
			}
			this.$store.commit("navmuta",pullobj)
			this.$store.commit("loadmuta",loading_01)
			request_02(nav,pageid)
			.then(res =>{
				// console.log(res)
				//vuex传值
				if(res.data.length == 0){
					let nonedata_02 = true
					this.$store.commit("nonemuta",nonedata_02)
					let listdata = res.data
					this.$store.commit("listact",listdata)
				}else{
					let listdata = res.data
					this.$store.commit("listact",listdata)
				}
			}).catch(err =>{
				console.error(err)
			})
		}
	}
	
}
</script>

<style>
	.active {
		background-image: linear-gradient(to right, #ccffff 0%, #ffcc00 100%);
		border-top-right-radius: 50rpx;
	}
	.activeb {
		color: #292c33 !important;
	}
	.scroll{ white-space: nowrap;
		width: 100%;
		position: absolute; left: 0; right: 0;
		background: #FFFFFF;
		padding: 20rpx 0;
		}
		
	.con-text-a {
		color: #292c33;
		font-size: 30rpx;
		font-weight: bold;
	}
	.con-text-b {
		color: #9ea0a5;
		font-size: 23rpx;
	}
	.list-cont {
		width: 180rpx;
		display: inline-block;
		text-align: center;
	}
</style>

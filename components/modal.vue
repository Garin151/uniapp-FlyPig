<template>
	<view>
		<view class="warp" v-show="modalShow">
			<view class="warp-view">
				<view class="warp-text">请登录后再操作</view>
				<view class="warp-flex">
					<button plain="true" @click="messageCancel">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
			</view>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	import {login} from "../common/unity.js"
	import {HMmessages} from "./HM-messages.vue"
	export default {
		name:"modal",
		data() {
			return {
				modalShow: false
			}
		},
		
		components: {
			HMmessages
		},
		
		methods:{
			getUserInfo(event) {
				this.modalShow = false
				let user = event.detail.userInfo
				login(user)
				.then(res =>{
					//console.log(res)
					this.HMmessages.show('登陆成功',{icon:"success",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(255,127,36,1)"})
				}).catch(err =>{
					console.log(err)
				})
			},
			
			messageCancel() {
				this.modalShow = false
			},
			
			modal_init() {
				this.modalShow = true
			}
		}
	}
</script>

<style scoped>
/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}
	.warp-view {
		width: 500upx;
		height: 200upx;
		background: #ffffff;
		margin: auto;
		position: absolute;
		-webkit-position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}
	.warp-text {
		text-align: center;
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}
	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #eeeeee;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		-webkit-transform: translateZ(0);
	}
	.warp-flex button {
		border: none;
		font-size: 30upx;
	}
</style>

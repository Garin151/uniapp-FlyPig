<template>
	<view>
		<!-- 评论 -->
		<view class="cont-message cont-back">
			<view class="img-video" >宝贝评价({{leaveword.length}})</view>
			<!-- 分类 -->
			<view class="menu-block">
				<block v-for="(item,index) in newmessage" :key="index">
					<view :class="{ activetext: index == num }" @click="menubtn(index,item)">{{item}}</view>
				</block>
			</view>
			<!-- 评价 -->
			<block v-for="(item,index) in leaveword" :key="index">
				<view class="message-dist">
					<view class="users-message">
						<view class="cont-name">
							<image :src="item.avatarUrl" mode="widthFix"></image>	
							<text>{{item.nickName}}</text>
						</view>
						<view class="message-time">
							{{item.creatTime.substr(0,10)}}
						</view>
					</view>	
					<view class="cont-name-text">
						<text :selectable="true" space="ensp" class="ttt">{{item.usermess}}</text>
					</view>
				</view>
			</block>
		</view>
		
		<!-- 评论按钮 -->
		<view class="evaluation" @click="popup()">
			<input type="text" placeholder="我来说两句" disabled="disabled"/>
		</view>
	
		<!-- 评论框 -->
		<view class="Comment-box" v-if="box" :catchtouchmove="true">
			<view class="Comment-text">
				<textarea  placeholder="写下你对这篇游记的评价"  :show-confirm-bar="false" focus="true" v-model="Comment"/>
			</view>
			<!-- 发表按钮 -->
			<view class="published">
				<view @click="messcancel()">取消</view>
				<view @click="bTn()">发表</view>
			</view>
		</view>
		<!-- 登录模态框-->
		<cpn_modal ref="mon"></cpn_modal>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
import cpn_modal from "../../../components/modal.vue"
import HMmessages from "../../../components/HM-messages.vue"
let until = require("../../../common/until.js")
let time = until.formatTime(new Date())
let db = wx.cloud.database()
let SQL_User = db.collection("SQL-User")
let SQL_Message = db.collection("SQL-Message")
export default {
	name:"D_message",
	
	components:{
		cpn_modal,
		HMmessages
	},
	
	props:{
		leavemessage:Array,
		leaveword:Array,
		ID:String
	},
	
	data() {
		return {
			num:0,
			box:false,
			avatarUrl:"",
			nickName:"",
			Comment:"",
			newmessage:[]
		}
	},
	
	methods:{
		menubtn(index,item) {
			this.num = index
			//console.log(item)
			this.$parent.fatherMethod(item)
		},
		
		popup() {
			SQL_User.get()
			.then(res =>{
				if(res.data.length == 0){
					this.$nextTick(() =>{
						this.$refs.mon.modal_init()
					})
				}else {
					//console.log("已经登录")
					let Users = res.data[0]
					this.avatarUrl = Users.avatarUrl
					this.nickName = Users.nickName
					this.box = true
				}
			})
			.catch(err =>{
				console.log(err)
			})
		},
		
		messcancel() {
			this.box = false
		},
		
		bTn() {
			if(this.Comment == ""){
				this.HMmessages.show('评论不能为空',{icon:"error",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(102,0,51,1)"})
			}else {
				this.submit()
			}
		},
		
		async submit() {
			let stamess = await this.aimessage()
			//console.log(stamess)
			if(stamess.length == 0){
				let classif = ""
				await this.upMessage(classif)
			}else {
				let ali = stamess[stamess.length - 1]
				let [prop,adj] = [ali.prop,ali.adj]
				let classif = prop + adj
				await this.upMessage(classif)
			}
		},
		
		aimessage() {
			return new Promise((resolve,reject) =>{
				wx.cloud.callFunction({
					name:"aiMessage",
					data:{
						message:this.Comment
					}
				})
				.then(res =>{
					resolve(res.result.aimessage.items)
				})
				.catch(err =>{
					reject(err)
				})
			})
		},
		
		upMessage(classif) {
			return new Promise((resolve,reject) =>{
				let messageArray = {
					usermess:this.Comment,
					creatTime:time,
					avatarUrl:this.avatarUrl,
					nickName:this.nickName
				}
				SQL_Message.add({
					data:{
						id:this.ID,
						classMessage:classif,
						MessageData:messageArray
					}
				})
				.then(res =>{
					//console.log(res)
					this.HMmessages.show('评论成功',{icon:"success",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(200,120,51,1)"})
					setTimeout(res =>{
						let item = "全部"
						this.$parent.fatherMethod(item)
						this.Comment = ""
						this.box = false
					},1200)
				})
				.catch(err =>{
					console.log(err)
				})
			})
		}
	},
	
	watch:{
		leavemessage(newData,oldData) {
			this.newmessage = ["全部",...newData]
			this.num = 0
		}
	}
}
</script>

<style scoped>
	/* 评价 */
	 .cont-message{margin-top: 20upx; margin-bottom: 80upx;}
	 .cont-back{padding: 20upx; background: #FFFFFF;}
	 .img-video{color: #333333; font-size: 30upx; font-weight: bold; padding: 20upx 0;}
	 .users-message{display: flex; justify-content: space-between; height: 50upx; align-items: center; margin-bottom: 15upx;}
	 .message-time{font-size: 25upx; color: #a8a8a8;}
	 .cont-name image{width: 50upx !important; height: 50upx !important; border-radius: 50%; margin-right: 9upx;}
	 .cont-name text{font-size: 30upx; color: #a8a8a8;}
	 .cont-name{display: flex; align-items: center; height: 50upx;}
	 .cont-name-text text{font-size: 27upx; color: #333333; line-height: 1.5;
		width: 100%;
		text-overflow: ellipsis;
		white-space: normal;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
	 }
	 .message-dist{margin-bottom: 30upx; border-bottom: 1rpx solid #f8f8f8;
	 padding-bottom: 25upx;}
	 /* 评论按钮 */
	 .evaluation{background: #f8f8f8; position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				height: 90upx;
				display: flex;
				align-items: center;
				}
		.evaluation input{font-size: 30upx; color: #9a9a9a;
		background: #f0f0f0;
		height: 70upx;
		width: 100%;
		border-radius: 50upx;
		margin: 0 30upx;
		padding-left: 10upx;
		}
		/* 评论框 */
		.Comment-text textarea{width: 100%; color: #808080 !important; font-size: 30upx;
								padding: 8upx;}		
		.Comment-box{position: fixed; top: 0; bottom: 0; right: 0; left: 0;
					background: #F1F1F1;
					z-index: 9999;}
		.Comment-text{background: #FFFFFF; padding-top: 70upx;}	
		.published view{font-size: 35upx; background: #ffdd00;
					width: 200upx;
					text-align: center;
					padding: 10upx 0;
					border-radius: 10upx;
					}
		.published{display: flex;  justify-content: space-around;
					margin-top: 20upx;}			
		/* 分类 */
		.activetext{color: #4CD964; background: #ffdd00 !important; border: 1px solid #ffdd00 !important;}
		.menu-block view {
			background: #ffffff;
			border: 1px solid #c2c5cc;
			border-radius: 6upx;
			font-size: 25upx;
			color: #292c33;
			font-weight: bold;
			text-align: center;
			padding: 15upx;
			margin: 15upx;
		}
		
		.menu-block {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
</style>
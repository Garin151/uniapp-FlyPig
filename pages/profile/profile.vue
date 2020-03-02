<template>
	<view>
			<view class="myhome">
			<!-- 已登录 -->
				<block v-for="(item,index) in Userinfo" :key="index">
				<view class="wx-name" v-if="WXlogin">
					<view>
						<image :src="item.avatarUrl"></image>	
					</view>
					<view class="wx-text">
						<text>{{item.nickName}}</text>
						<text>领取会员</text>
					</view>
				</view>
				</block>
				<!-- 未登录 -->
				<view class="wx-button" v-if="!WXlogin">
					<view class="wx-button-view">登录生如夏花，开启旅程</view>
					<view>
						<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
					</view>
				</view>
		</view>
		</view>
</template>

<script>
const db = wx.cloud.database()
const SQL_User = db.collection("SQL-User")
import {login} from "../../common/unity.js"
export default {
	name:"Page_profile",
	
	//生命周期函数
	onShow() {
		this.ifUserLogin()
	},
	
	//生命周期函数
	
	data() {
		return {
			WXlogin:false,
			Userinfo:[]
		}
	},
	
	methods:{
		getUserInfo(event) {
			let user = event.detail.userInfo
			login(user)
			.then(res =>{
				//console.log(res)
				this.ifUserLogin()
			})
			.catch(err =>{
				console.log(err)
			})
		},
		
		ifUserLogin() {
			SQL_User.get()
			.then(res =>{
				//console.log(res.data)
				if(res.data.length == 0){
					this.WXlogin = false
				}else {
					this.WXlogin = true
					this.Userinfo = res.data
				}
			})
			.catch(err =>{
				console.log(err)
			})
		}
	}
}
</script>

<style scoped>
.myhome{background: linear-gradient(to top, #ffe566 10%, #ffd300 100%); height: 350upx; display: flex; align-items: center;}
	.wx-name image{width: 120upx !important; height: 120upx !important; border-radius: 50%; margin-right: 20upx;
					border: 10rpx solid #999999;}
	text{display: block; margin: 10upx 0; color: #999999;}
	.wx-name{display: flex; align-items: center; padding: 0 30upx; align-content: center;
			height: 200upx;}
	.wx-text text:nth-child(1){font-size: 35upx;}
	.wx-text text:nth-child(2){font-size: 20upx; border: 1px solid #FFFFFF;
								padding: 7upx;
								border-radius: 50upx;
								text-align: center;}
	/* 登录 */
	.wx-button button{border: none;font-size: 30upx; background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
	 border-radius: 50upx;
	color: #FFFFFF;}							
	.wx-button-view{font-size: 35upx; color: #FFFFFF; margin-bottom: 25upx;}
	.wx-button{margin: 0 auto;}
</style>

<template>
<view>
		<view class="search-cont">
			<view class="search">
				<input type="text"  placeholder-class="inputclass" confirm-type ="search" 
				focus="true"
				placeholder="请输入关键字" 
				v-model="searchdata"
				@confirm="onKeyInput"
				/>
			</view>
			<view class="search-code" @click="seArch()">
				搜索
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>搜索历史</view>
				<view @click="deleteSearchCash()"><image src="../../static/tab/searchend.svg" mode="widthFix"></image></view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="CashSearch(item)">{{item}}</view>
				</block>
			</view>
		</view>
		
		<!-- 内容展示 -->
		<view class="active" v-if="isShow">
			<view class="conteng">
				<block v-for="(item,index) in localdata" :key="index">
				<view class="conteng-article newing" @click="localCont(item._id)">
					<view  class="conteng-img">
					<block v-for="(itemimg,index) in item.topimg" :key="index">
					<image :src="itemimg" mode="aspectFill"  class="animated fadeIn" lazy-load></image>	
					</block>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-name">{{item.titledata}}</view>
						<view class="active-title">{{item.tipsdata}}</view>
					</view>
					<view class="purchase userinfo">
						<image :src="item.avatarUrl" mode="widthFix"></image>
						<text class="active-purchase" v-if="item.nickName != '' ">{{item.nickName}}</text>
					</view>
				</view> 
				</block>
			</view>
		</view>
		<!-- 没有搜索到的提示 -->
		<cpn_nonedata v-if="nonedataShow"></cpn_nonedata>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
import HMmessages from "../../components/HM-messages.vue"
export default {
	name:"Page_search",
	
	data() {
		return {
			ifhistory:false,
			setdata: [],
			searchdata:"",
			localdata:[],
			nonedataShow:false,
			isShow:false
		}
	},
	
	components:{
		HMmessages
	},
	
	//生命周期函数
	created() {
		let name_02 = "SearchHistory"
		this.GetSearchCash(name_02)
	},
	
	//生命周期函数
	
	methods:{
		seArch() {
			if(this.searchdata != ""){
				this.ifhistory = false
				this.isShow = false
				//搜索历史本地缓存
				let name = "SearchHistory"
				this.SetSearchCash(name,this.searchdata)
				this.SearchData(this.searchdata)
			}else{
				this.HMmessages.show('搜索不能为空',{icon:"error",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(102,0,51,1)"})
			}
		},
		
		onKeyInput() {
			if(this.searchdata != ""){
				this.ifhistory = false
				this.isShow = false
				//搜索历史本地缓存
				let name = "SearchHistory"
				this.SetSearchCash(name,this.searchdata)
				this.SearchData(this.searchdata)
			}else{
				this.HMmessages.show('搜索不能为空',{icon:"error",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(102,0,51,1)"})
			}
		},
		
		SetSearchCash(name,value) {
			const CashData_01 = uni.getStorageSync(name) || []
			CashData_01.unshift(value)
			uni.setStorageSync(name,CashData_01)
		},
		
		GetSearchCash(name) {
			let CashData_02 = uni.getStorageSync(name)
			let CashData_03 = Array.from(new Set(CashData_02))
			if(CashData_03 == ""){
				this.ifhistory = false
			}else {
				this.setdata = CashData_03
				this.ifhistory = true
			}
		},
		
		deleteSearchCash() {
			uni.removeStorageSync("SearchHistory")
			this.ifhistory = false
		},
		
		SearchData(value) {
			const db = wx.cloud.database()
			const SQL_UserData = db.collection("SQL-UserData")
			SQL_UserData.where({
				tipsdata:db.RegExp({
					regexp:value,
					options:"m"
				})
			})
			.get()
			.then(res =>{
				this.isShow = true
				if(res.data.length == 0){
					this.nonedataShow = true
					this.localdata = ""
				}else {
					this.nonedataShow = false
					this.localdata = res.data
				}
			})
			.catch(err =>{
				console.log(err)
			})
		},
		
		CashSearch(value) {
			this.ifhistory = false
			this.searchdata = value
			this.SearchData(value)
		},
		
		localCont(id) {
			uni.navigateTo({
				url:"../detail/detail?id=" + id
			})
		}
		
		
	},
	
	watch:{
		searchdata(newData,oldData) {
			if(newData == ""){
				let name_03 = "SearchHistory"
				this.GetSearchCash(name_03)
				this.isShow = false
				this.ifhistory = true
				this.nonedataShow = false
				this.localdata = ""
			}
		}
	}
}
</script>

<style scoped>
	@import "../../common/uni.css";
		.search{
		    height: 70upx;
			line-height: 70upx;
		    width: 100%;
		    display: flex;
		    flex-direction: row;
			background:#f8f8f8;
			border-top-left-radius: 50upx;
			border-bottom-left-radius: 50upx;
			border-bottom-right-radius:50upx;
			margin-left: 20upx;
			}
		.search input{
				height: 70upx;
				line-height: 70upx;
		        width: 100%;
		        font-size: 30upx;
				color: #666666; 
				padding-left: 30upx;
				  } 
		.search-cont{display: flex; justify-content: space-between; height: 70upx; align-items: center;
					padding: 30upx 0;
					}
		.search-code{width: 150upx; height: 50upx; text-align: center; font-size: 30upx;}
		/* 搜索历史 */
		.search-history{margin: 20upx;}
		.search-title{font-size: 30upx; font-weight: bold;
					display: flex;
					justify-content:space-between;
					align-items: center;
					height: 60upx;
					line-height: 60upx;}
		.search-title image{width: 36upx; height: 36upx; display: block;}
		.menu-block view {
			background: #f7f8fa;
			border-radius: 6upx;
			font-size: 27upx;
			color: #292c33;
			text-align: center;
			padding: 10upx;
			margin: 20upx 20upx 0 0;
		}
		
		.menu-block {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
		.newing{padding-bottom: 30upx;}
		/* 用户头像 */
		.userinfo image{width: 50upx; height: 50upx; border-radius: 50upx;}
		.userinfo text{padding-left: 20upx;}
		.userinfo{padding-top: 20upx;}
</style>
</style>

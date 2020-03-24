<template>
	<view>
		<view class="travels">
			<!-- 分类 -->
			<view class="classify-view">
				<view class="classify-text">分类</view>
				<block v-for="(item, index) in fication" :key="index">
					<view class="classify">
						<text :class="{ activetext: index == num }" @click="menubtn(index,item.name)">{{ item.name }}</text>
					</view>
				</block>
			</view>
			<!-- 标题 -->
			<view class="travels-title">
				<input type="text" placeholder="给旅行日记起个标题吧" class="place-text" v-model="titledata" />
			</view>
			<!-- 描述 -->
			<view class="travels-describe">
				<textarea placeholder="描述下你的旅行心得,帮助更多旅行的人" v-model="tipsdata" />
			</view>
		</view>

		<!-- 上传图片 -->
		<view class="travels-image">
			<view class="topimg">
				<image src="../../static/tab/topimg.png" mode="widthFix" @click="uploadImg"></image>
			</view>
			<!-- 九宫格 -->
			<view class="conteng">
				<block v-for="(item,index) in topimg" :key="index">
					<view class="conteng-img">
						<view class="upload-img-mask">
							<image :src="item" mode="aspectFill" class="upload-img" @click="preImage(index)"></image>
						</view>
						<image src="../../static/tab/deteimg.svg" mode="widthFix" class="deleteimg" @click="deleteImg(index)"></image>
					</view>
				</block>
			</view>
			
		</view>

		<!-- 上传视频 -->
		<view class="travels-video">
			<view class="topimg">
				<image src="../../static/tab/topvideo.png" mode="widthFix" @click="uploadVideo"></image>
			</view>
			<view class="uploadvideo" v-if="uploadShow">
				<video :src="videos" objectFit="cover"></video>
				<image class="pause" src="../../static/tab/delvideo.png" @click="deleteVideo"></image>
			</view>
		</view>

		<!-- 定位 -->
		<view class="address">
			<view class="address-text">你在哪里</view>
			<view class="address-site" @click="chooseCity()">
				<image src="../../static/tab/addimg.svg" mode="widthFix"></image>
				<text>{{address}}</text>
			</view>
		</view>

		<!-- 发布 -->
		<view class="release" @click="suBmitd">发布</view>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<!-- 登录模态框 -->
		<cpn_modal ref="mon"></cpn_modal>
		<!-- 提示用户上传成功与否 -->
		<view class="warp" v-if="relend">
			<view class="warp-view tipmin">
				<text>{{ reldata }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from "vuex"
import {previewImage} from "../../common/preview_image.js"
import {addressData} from "../../common/Located.js"
import {HMmessages} from "../../components/HM-messages.vue"
import {cpn_modal} from "../../components/modal.vue"
let until = require("../../common/until.js")
//let time = until.formatTime(new Date())
let db = wx.cloud.database()
let SQL_UserData = db.collection("SQL-UserData")
export default {
	name: 'travel',
	//生命周期函数
	created() {
		this.addRess()
		let citydata = this.address
		this.$store.commit("travelmuta",citydata)
	},
	
	onShow() {
		let value = false
		this.$store.commit("refreshMuta",value)
	},
	
	//生命周期函数
	
	//自定义组件和插件
	components: {
		HMmessages,
		cpn_modal
	},
	
	
	data() {
		return {
			num:0,
			fication: [
				{
					name: '景点'
				},
				{
					name: '美食'
				},
				{
					name: '网红打卡'
				}
			],
			uploadShow:false,
			chooseTab:"景点",
			titledata:"",
			tipsdata:"",
			topimg:[],
			videos:"",
			address:"",
			avatarUrl:"",
			nickName:"",
			openid:"",
			reldata:"正在发布...",
			relend:false
		};
	},
	methods:{
		menubtn(index,name) {
			this.num = index
			//console.log(name)
			this.chooseTab = name
			
		},
		
		uploadImg() {
			uni.chooseImage({
				count:9,
				sizeType:['original', 'compressed'],
				sourceType:['album'],
				success:res =>{
					//console.log(res.tempFilePaths)
					this.topimg.push(...res.tempFilePaths)
				}
			})
		},
		
		deleteImg(index) {
			//console.log(index)
			this.topimg.splice(index,1)	
		},
		
		preImage(index) {
			//console.log(index)
			previewImage(index,this.topimg)
			.then(res =>{
				//console.log("预览成功")
			}).catch(err =>{
				console.log("预览失败")
			})
		
		},
		
		uploadVideo() {
			uni.chooseVideo({
				count:1,
				compressed:false,
				sourceType: ["album"],
				maxDuration:40,
			}).then(res =>{
				//console.log(res)
				this.videos = res[1].tempFilePath
				this.uploadShow = true
			}).catch(err =>{
				console.log(err)
			})
		},
		
		deleteVideo() {
			this.videos = "",
			this.uploadShow = false
		},
		
		addRess() {
			addressData().then(res =>{
				//console.log(res)
				this.address = res.result.ad_info.city
			}).catch(err =>{
				//console.log(err)
				this.address = "桂林市"
			})
		},
		
		chooseCity() {
			uni.navigateTo({
				url:"../city/city"
			})
		},
		
		suBmitd() {
			//console.log(this.topimg)
			if(this.titledata == ""){
				this.HMmessages.show('标题必填',{icon:"error",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(238,64,0,1)"})
			}else if(this.tipsdata == ""){
				this.HMmessages.show('描述必填',{icon:"error",iconColor:"#ffffff",fontColor:"#ffffff",background:"rgba(238,64,0,1)"})
			}else{
				//判断用户登录状态
				this.UserInfo()
			}
		},
		
		UserInfo() {
			let db = wx.cloud.database()
			let SQL_User = db.collection("SQL-User")
			SQL_User.get()
			.then(res =>{
				//console.log(res)
				if(res.data.length == 0){
					this.$nextTick(() =>{
						this.$refs.mon.modal_init()
					})
				}else{
					//console.log("已经登录")
					let usermen = res.data[0]
					this.avatarUrl = usermen.avatarUrl
					this.nickName = usermen.nickName
					this.openid = usermen.openid
					//上传用户发表的数据
					this.relend = true
					this.uploadUserData()
				}
			}).catch(err =>{
				console.log(err)
			})
		},
		
		async uploadUserData() {
			let upLoadImage = await this.upImage()
			//console.log(upLoadImage)
			let upLoadVideo = await this.upVideo()
			//console.log(upLoadVideo)
			await this.upLoadText(upLoadImage,upLoadVideo)
			await this.refreshPage()
		},
		
		upImage() {
			let upFile_ID = []
			let okArray = []
			//console.log("开始上传图片")
			return new Promise((resolve,reject) =>{
				this.topimg.forEach((img) =>{
					//console.log(img)
					//拼接上传的名字字符串
					let imgion = img.lastIndexOf(".")
					let eximg = img.slice(imgion)
					let cloudpath = `${Date.now()}-${Math.floor(Math.random(0,1) * 10000000)}${eximg}`
					upFile_ID.push("cloud://test-01-nkmqa.7465-test-01-nkmqa-1300405154/"+"static/" + cloudpath)
					wx.cloud.uploadFile({
						cloudPath:"static/" + cloudpath,
						filePath:img
					}).then(res =>{
						//console.log(res)
						//避免resolve的异步，返回不正确的数据
						okArray.push(res.fileID)
						if(okArray.length == this.topimg.length){
							resolve(upFile_ID)
						}
						//console.log("上传图片成功")
					}).catch(err =>{
						console.log(err)
					})
				})
			})
		},
		
		upVideo() {
			//console.log("开始上传视频")
			return new Promise((resolve,reject) =>{
				//判断用户是否要上传视频
				if(this.videos == ""){
					//console.log("用户不上传视频")
					resolve("")
				}else{
					let videoion = this.videos.lastIndexOf(".")
					let exvideo = this.videos.slice(videoion)
					let cloudpath_02 = `${Date.now()}-${Math.floor(Math.random(0,1) * 10000000)}${exvideo}`
					wx.cloud.uploadFile({
						cloudPath:"video/" + cloudpath_02,
						filePath: this.videos
					}).then(res =>{
						resolve(res.fileID)
						//console.log("上传视频成功")
					}).catch(err =>{
						console.log(err)
					})
				}
			})
		},
		
		upLoadText(finalImage,finalVideo) {
			//console.log("开始上传数据库")
			let datas = {
				chooseTab:this.chooseTab,
				titledata:this.titledata,
				tipsdata:this.tipsdata,
				topimg:finalImage,
				videos:finalVideo,
				address:this.address,
				avatarUrl:this.avatarUrl,
				nickName:this.nickName,
				openid:this.openid,
				creatTime:until.formatTime(new Date())
			}
			SQL_UserData.add({
				data:datas
			}).then(res =>{
				//console.log("上传数据库成功")
				//console.log(res)
				this.reldata = "发布成功!"
				setTimeout(() =>{
					uni.switchTab({
						url:"../strategy/strategy"
					})
				},1700)
			}).catch(err =>{
				console.log(err)
			})
		},
		
		//用户发表成功后，自动刷新数据
		refreshPage() {
			let value = true
			this.$store.commit("refreshMuta",value)
		}
		
	},
	
	//计算属性
	computed:{
		...mapState(["store_city_02"]),
		valueChange_02() {
			this.address = this.store_city_02
		}
		
	},
	
	
};
</script>

<style scoped>
.travels {
	padding: 10upx 20upx;
}
.classify text {
	display: block;
	font-size: 27upx;
	color: #14181e;
	background: #f7f7f7;
	padding: 10upx 20upx;
	border-radius: 20upx;
	margin: 0 30upx;
}
.classify {
	display: flex;
}
.classify-text {
	font-size: 30upx;
	color: #14181e;
	font-weight: bold;
}
.classify-view {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
/* 选中的样式 */
.activetext {
	background: #ffdd00 !important;
}
/* 标题 */
.place-text {
	color: #808080 !important;
	font-size: 30upx;
}
.travels-title {
	margin: 40upx 0;
}
/* 描述 */
.travels-describe textarea {
	width: 100%;
	color: #808080 !important;
	font-size: 30upx;
}
/* 上传图片 */
.topimg image {
	width: 150upx;
	height: 150upx;
	border-radius: 20upx;
}
.topimg {
	padding-left: 20upx;
	padding-top: 10upx;
}
/* 九宫格 */
.conteng {
	display: flex;
	flex-wrap: wrap;
	margin-left: 4px;
	margin-right: 4px;
}
.conteng-img {
	width: calc((100% / 4) - 8px) !important;
	margin: 4px;
	height: 176rpx;
	position: relative;
}
.upload-img {
	width: 100% !important;
	height: 100% !important;
	border-radius: 6rpx;
	opacity: 0.8;
}
.upload-img-mask {
	width: 100% !important;
	height: 100% !important;
	border-radius: 6rpx;
	background: radial-gradient(#EDEDED 50%,#606060);
}
/* 删除图片 */
.deleteimg {
	width: 38upx;
	height: 38upx;
	position: absolute;
	top: 6upx;
	right: 6upx;
}
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
/* 覆盖视频 */
.pause {
	width: 50upx;
	height: 50upx;
	position: absolute;
	top: 6upx;
	right: 6upx;
}
/* 位置 */
.address-site {
	display: flex;
	align-items: center;
}
.address-site image {
	width: 40upx;
	height: 40upx;
	margin-right: 10upx;
}
.address-site text {
	font-size: 30upx;
	color: #00a2ff;
}
.address-text {
	font-size: 30upx;
	color: #333333;
	padding-right: 40upx;
}
.address {
	display: flex;
	background: #f1f1f1;
	padding: 20upx 0 20upx 20upx;
	margin-top: 30upx;
	margin-bottom: 160upx;
}
/* 发布 */
.release {
	background: #ffdd00;
	width: 100%;
	height: 100upx;
	font-size: 40upx;
	line-height: 100upx;
	text-align: center;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
}
/* 提示用户上传成功与否 */
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
/* 提示框 */
.tipmin text {
	font-size: 34upx;
	display: flex;
	justify-content: center;
	line-height: 200upx;
}
</style>

<template>
	<view>
		<cpn_address :address = "address"></cpn_address>
		<cpn_locality></cpn_locality>
		<cpn_contents :sql_list = "sql_list_02" v-if="!loadShow"></cpn_contents>
		<view class="fabBtn animated fadeInUp">
			<image src="../../static/tab/fab.png" mode="widthFix" @click="ToTravel"></image>
		</view>
		<cpn_loading v-if="loadShow"></cpn_loading>
		<cpn_nonedata v-if="nonedataShow"></cpn_nonedata>
	</view>
</template>

<script>
	import cpn_address from "./components/address.vue"
	import cpn_locality from "./components/locality.vue"
	import cpn_contents from "./components/contents.vue"
	import {addressData} from "../../common/Located.js"
	import {mapState} from "vuex"
	let db = wx.cloud.database()
	let SQL_UserData = db.collection("SQL-UserData")
	export default {
		//生命周期函数
		created() {
				this.addRess()
		},
		
		
		//生命周期函数
		name:"strategy",
		data() {
			return {
				address: "",
				W_address:"",
				sql_list_02:"",
				loadShow:false,
				choosetab:"全部",
				nonedataShow:false,
				x_refresh:false
			}
		},
		components: {
			cpn_address,
			cpn_locality,
			cpn_contents
		},
		
		methods:{
			
			fatherMethod(name) {
				//console.log(name)
				this.nonedataShow = false
				this.choosetab = name
				this.loadShow = true
				if(name =="全部"){
					this.DataFromCity(this.address)
				}else{
					//console.log("不是全部")
					this.DataFromTab(this.address,name)
				}
			},
			
			DataFromTab(city,tab) {
				SQL_UserData.where({
					address:city,
					chooseTab:tab
				})
				.orderBy("creatTime","desc")
				.get()
				.then(res =>{
					//console.log(res.data)
					this.sql_list_02 = res.data
					if(res.data.length == 0){
						this.loadShow = false
						this.nonedataShow = true
					}else {
						this.loadShow = false
						this.nonedataShow = true
					}
				}).catch(err =>{
					console.log(err)
				})
			},
			
			addRess() {
				addressData()
				.then(res =>{
					this.address = res.result.ad_info.city
				 this.DataFromCity(this.address)
				}).catch(err =>{
					console.log("用户拒绝定位")
					this.address = "桂林市"
					 this.DataFromCity(this.address)
				})
			},
			
			ToTravel() {
				uni.navigateTo({
					url:"../travel/travel"
				})
			},
			
			DataFromCity(city) {
				//console.log(city)
				SQL_UserData.where({
					address:city
				})
				.orderBy("creatTime","desc")
				.get()
				.then(res =>{
					//console.log(res.data)
					this.sql_list_02 = res.data
					if(res.data.length == 0){
						this.loadShow = false
						this.nonedataShow = true
					}else {
						this.loadShow = false
						this.nonedataShow = true
					}
				}).catch(err =>{
					console.log(err)
				})
				
			},
			
			
		},
		
		computed:{
			...mapState(["store_city","store_refresh"]),
			valueChange() {
				//console.log(this.store_city)
				this.W_address = this.store_city
			},
			
			refreshChange() {
				if(this.store_refresh == true) {
					this.contentShow = false
					this.loadShow = true
					this.nonedataShow = false
					if(this.choosetab =="全部"){
						this.DataFromCity(this.address)
						uni.stopPullDownRefresh()
					}else{
						this.DataFromTab(this.address,this.choosetab)
						uni.stopPullDownRefresh()
					}
				}
			}
		},
		
		watch:{
			W_address(newData,oldData){
				this.address = newData
				this.contentShow = false
				this.loadShow = true
				this.nonedataShow = false
				if(this.choosetab =="全部"){
					this.DataFromCity(this.address)
					uni.stopPullDownRefresh()
				}else{
					this.DataFromTab(this.address,this.choosetab)
					uni.stopPullDownRefresh()
				}
			}
		},
		
		onPullDownRefresh() {
			this.contentShow = false
			this.loadShow = true
			this.nonedataShow = false
			if(this.choosetab =="全部"){
				this.DataFromCity(this.address)
				uni.stopPullDownRefresh()
			}else{
				//console.log("不是全部")
				this.DataFromTab(this.address,this.choosetab)
				uni.stopPullDownRefresh()
			}
		}
		
		
		
	}
</script>

<style>
	.fabBtn image{
		width: 120rpx !important;
		height: 100rpx !important;
		border-radius: 30rpx;
	}
	.fabBtn {
		position: fixed;
		bottom: 20rpx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
</style>

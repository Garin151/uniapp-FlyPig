<template>
	<view>
		<view class="scroll-flex" v-if="navShow" :style="{opacity:O_value}">
			<cpn_navs></cpn_navs>
		</view>
		<cpn_banner :imgArray = "listData" :detailData = "tipsData" :leaveword = "Message"></cpn_banner>
		<cpn_matter :imgArray = "listData" :videoData = "video"></cpn_matter>
		<cpn_message :leavemessage = "Class" :leaveword = "Message" :ID = "id"></cpn_message>
	</view>
</template>

<script>
import cpn_navs from "./components/navs.vue"
import cpn_banner from "./components/banner.vue"
import cpn_matter from "./components/matter.vue"
import cpn_message from "./components/message.vue"
let db = wx.cloud.database()
let SQL_UserData = db.collection("SQL-UserData")
let SQL_Message = db.collection("SQL-Message")
export default {
	name:"detail",
	
	//生命周期函数
	onPageScroll(event) {
		//console.log(event.scrollTop)
		let scrollTop = event.scrollTop
		this.handScroll(scrollTop)
	},
	
	onLoad(event) {
		//console.log(event)
		//event.id = "1acf1de95e366054092e7fb112ac0023"
		this.id = event.id
		this.requestDetail(event.id)
		this.RequestMessage(event.id)
	},
	
	//生命周期函数
	
	
	data() {
		return {
			navShow:false,
			O_value:0,
			listData:[],
			tipsData:"",
			video:"",
			Class:[],
			Message:[],
			id:""
		}
	},
	
	components:{
		cpn_navs,
		cpn_banner,
		cpn_matter,
		cpn_message
	},
	
	methods:{
		handScroll(scrollTop) {
			if(scrollTop > 90){
				//console.log(scrollTop)
				let value_01 = scrollTop / 180
				value_01 = value_01 > 1 ? 1 : value_01
				//console.log(value_01)
				this.navShow = true
				this.O_value = value_01
			}else{
				this.navShow = false
			}
		},
		
		requestDetail(id) {
			SQL_UserData.where({
				_id:id
			})
			.get()
			.then(res =>{
				//console.log(res.data[0].topimg)
				this.listData = res.data[0].topimg
				this.tipsData = res.data[0].tipsdata
				this.video = res.data[0].videos
			}).catch(err =>{
				console.log(err)
			})
		},
		
		RequestMessage(id) {
			SQL_Message.where({
				id:id
			})
			.orderBy("MessageData.creatTime","desc")
			.get()
			.then(res =>{
				//console.log(res.data)
				this.classFilter(res.data)
				this.messageFilter(res.data)
			})
			.catch(err =>{
				console.log(err)
			})
		},
		
		classFilter(data) {
			let class_02 = data.map((item) =>{
				return item.classMessage
			})
			let newArray = Array.from(new Set(class_02))
			let class_03 = newArray.filter((item) =>item)
			this.Class = class_03
		},
		
		messageFilter(data) {
			let message_02 = data.map((item) =>{
				return item.MessageData
			})
			//console.log(message_02)
			this.Message = message_02
		},
		
		fatherMethod(item) {
			//console.log(item)
			if(item == "全部"){
				this.RequestMessage(this.id)
			}else {
				this.QueryMessage(this.id,item)
			}
		},
		
		QueryMessage(id,item) {
			SQL_Message.where({
				id:id,
				classMessage:item
			})
			.orderBy("MessageData.creatTime","desc")
			.get()
			.then(res =>{
				//console.log(res.data)
				this.messageFilter(res.data)
			})
			.catch(err =>{
				console.log(err)
			})
		}
	
	
		
	},
	
	
}
</script>

<style scoped>
	page{
			background: #f8f8f8;
		}
	.scroll-flex{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #ffd00c;
		z-index: 2;
	}
</style>

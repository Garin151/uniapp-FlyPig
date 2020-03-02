<template>
	<view>
		<cpn_search :Banners = "Banners"></cpn_search>
		<cpn_ticket></cpn_ticket>
		<cpn_classify></cpn_classify>
		<cpn_content id="boxFixed" :class="{'is_fixed' : isShow}" :tab = "tab"></cpn_content>
		<view style="height: 140rpx"></view>
		<cpn_loading v-if="loadinglist"></cpn_loading>
		<cpn_article :Articleend = "Articleend" v-if="!loadinglist"></cpn_article>
		<cpn_TopLoaing v-if="home_load"></cpn_TopLoaing>
		<cpn_nonedata v-if="x_nonedata"></cpn_nonedata>
		<uni-load-more v-if="loadmore" iconSize=18 :status="uniload" color="#ffcc99" :iconType="snow"></uni-load-more>
	</view>
</template>

<script>
	// 初始化云开发
	const db = wx.cloud.database()
	const SQL_Banner = db.collection("SQL-Banner")
	const SQL_Tab = db.collection("SQL-Tab")
	//导入自定义组件
	import {cpn_search} from "../../components/search.vue"
	import cpn_ticket from "../../components/ticket.vue"
	import cpn_classify from "../../components/classify.vue"
	import cpn_content from "../../components/content.vue"
	import cpn_article from "../../components/article.vue"
	import {request,request_02} from "../../common/cloudFunctioin.js"
	import {mapState} from "vuex"
	import uniLoadMore from "../../uni-load-more/uni-load-more.vue"
	//结构console.log()，省去重复编写
	let {log} = console
	export default {
		data() {
			return {
				isShow:false,
				rect:"",
				menutop:"",
				Banners:[],
				tab:[],
				Articleend:[],
				loadinglist:false,
				pageid: 0,
				nav:"",
				uniload:"loading",
				loadmore:false,
				x_nonedata:false,
				home_load:true
			}
		},
				
		components:{
			cpn_search,
			cpn_ticket,
			cpn_classify,
			cpn_content,
			cpn_article,
			uniLoadMore
		},
		
		methods:{
			pullon() {
				let p_list = this.nav
				request_02(p_list,this.pageid)
				.then(res =>{
					//console.log(res)
					if(res.data.length == 0){
						this.uniload = "noMore"
					}else{
						this.Articleend = [...this.Articleend,...res.data]
					}
				}).catch(err =>{
					console.error(err)
				})
			}
		},
		
		created() {
			// 请求轮播数据
			let banner = "SQL-Banner"
			let tab = "SQL-Tab"
			let recomment = "SQL-recomment"
			//并发批量请求多种数据 promise.all
			Promise.all([request(banner),request(tab),request_02(recomment,this.pageid)])
			.then(res =>{
				//log(res)
				this.Banners = res[0].data
				this.tab = res[1].data
				this.Articleend = res[2].data
				this.home_load = false
			}).catch(err =>{
				log(err)
			})
			
			
			//请求tab切换数据
			
		},
		
		onLoad() {
			const query = wx.createSelectorQuery()
			query.select('#boxFixed').boundingClientRect()
			query.exec((res)=>{
				this.menutop = res[0].top
			})
		},
		
		onPageScroll(event) {
			//console.log(event)
			this.rect = event.scrollTop
		},
		
		onReachBottom() {
			this.loadmore = true
			this.uniload = "loading"
			this.pageid ++
			this.pullon()
		},
		
		onPullDownRefresh() {
			let p_list = this.nav
			this.pageid = 0
			this.Articleend = []
			request_02(p_list,this.pageid)
			.then(res =>{
				//console.log(res)
				this.Articleend = res.data
				uni.stopPullDownRefresh()
			}).catch(err =>{
				console.error(err)
			})
		},
		
		computed:{
			...mapState(["list","navmin","navminobj","store_nonedata","uni_load"]),
			count() {
				this.Articleend = this.list.listing
			},
			countloading() {
				this.loadinglist = this.navmin
			},
			navdata() {
				this.loadinglist = this.navminobj.loading
				this.nav = this.navminobj.naving
				this.pageid = this.navminobj.navPageid
				this.loadmore = this.uni_load
				this.x_nonedata = this.navminobj.nonedata
			},
			noneData() {
				this.x_nonedata = this.store_nonedata
			},
			namepage(){
				if(this.rect > (this.menutop - 20)){
					this.isShow = true
				}else{
					this.isShow = false
				}
			}
		}
	}
</script>

<style>
	.is_fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
	}
</style>

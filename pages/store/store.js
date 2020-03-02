import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		list:{
			listing:[]
		},
		navmin:"",
		navminobj:{
			loading:"",
			naving:"SQL-recomment",
			navPageid:0,
			nonedata:""
		},
		uni_load:"",
		store_nonedata:"",
		store_city:"",
		store_city_02:"",
		store_refresh:false
	},
	
	
	actions:{},
	
	mutations:{
		loadmuta(state,loading_01){
			state.navmin = loading_01
		},
		listact(state,listdata){
			//console.log(listdata)
			state.list = {
				listing:listdata
			}
			state.navmin = false
		},
		navmuta(state,pullobj){
			state.navminobj.loading = pullobj.loading
			state.navminobj.naving = pullobj.nav
			state.navminobj.navPageid = pullobj.pageid
			state.uni_load = pullobj.uniload
			state.navminobj.nonedata = pullobj.nonedata
		},
		nonemuta(state,nonedata_02){
			state.navminobj.loading = false
			state.store_nonedata = nonedata_02
		},
		citymuta(state,cityion){
			//console.log(cityion)
			state.store_city = cityion
		},
		travelmuta(state,cityion){
			//console.log("发表地址:" + cityion)
			state.store_city_02 = cityion
		},
		refreshMuta(state,value) {
			state.store_refresh = value
		}
	}
	
})

export default store
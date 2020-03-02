import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入Vuex
import store from "./pages/store/store.js"
Vue.prototype.$store = store

import loader from "./components/loading.vue"
import nonedata from "./components/none.vue"
import top_loading from "./components/top_loading.vue"
Vue.component("cpn_loading",loader)
Vue.component("cpn_nonedata",nonedata)
Vue.component("cpn_TopLoaing",top_loading)

//引入CSS3动画插件
import animate from "animate.css"
Vue.use(animate)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{1238:function(n,t,e){},2946:function(n,t,e){"use strict";e.r(t);var o=e("83c2"),i=e("2963");for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);e("8c87");var c,a=e("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=u.exports},2963:function(n,t,e){"use strict";e.r(t);var o=e("f8b6"),i=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=i.a},"83c2":function(n,t,e){"use strict";var o,i=function(){var n=this,t=n.$createElement;n._self._c},r=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return o}))},"8c87":function(n,t,e){"use strict";var o=e("1238"),i=e.n(o);i.a},f1a0:function(n,t,e){"use strict";(function(n){e("144c"),e("921b");o(e("66fd"));var t=o(e("2946"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},f8b6:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("9bc5"),i=e("2f62");function r(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,o)}return e}function c(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?r(Object(e),!0).forEach((function(t){a(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function a(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function u(n){return f(n)||s(n)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function f(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}var d=wx.cloud.database(),h=(d.collection("SQL-Banner"),d.collection("SQL-Tab"),function(){e.e("components/search").then(function(){return resolve(e("d593"))}.bind(null,e)).catch(e.oe)}),p=function(){e.e("components/ticket").then(function(){return resolve(e("203b"))}.bind(null,e)).catch(e.oe)},b=function(){e.e("components/classify").then(function(){return resolve(e("97d4"))}.bind(null,e)).catch(e.oe)},m=function(){e.e("components/content").then(function(){return resolve(e("49da"))}.bind(null,e)).catch(e.oe)},v=function(){e.e("components/article").then(function(){return resolve(e("a530"))}.bind(null,e)).catch(e.oe)},g=function(){e.e("uni-load-more/uni-load-more").then(function(){return resolve(e("6e21"))}.bind(null,e)).catch(e.oe)},y=console,_=y.log,j={data:function(){return{isShow:!1,rect:"",menutop:"",Banners:[],tab:[],Articleend:[],loadinglist:!1,pageid:0,nav:"",uniload:"loading",loadmore:!1,x_nonedata:!1,home_load:!0}},components:{cpn_search:h,cpn_ticket:p,cpn_classify:b,cpn_content:m,cpn_article:v,uniLoadMore:g},methods:{pullon:function(){var n=this,t=this.nav;(0,o.request_02)(t,this.pageid).then((function(t){0==t.data.length?n.uniload="noMore":n.Articleend=[].concat(u(n.Articleend),u(t.data))})).catch((function(n){console.error(n)}))}},created:function(){var n=this,t="SQL-Banner",e="SQL-Tab",i="SQL-recomment";Promise.all([(0,o.request)(t),(0,o.request)(e),(0,o.request_02)(i,this.pageid)]).then((function(t){n.Banners=t[0].data,n.tab=t[1].data,n.Articleend=t[2].data,n.home_load=!1})).catch((function(n){_(n)}))},onLoad:function(){var n=this,t=wx.createSelectorQuery();t.select("#boxFixed").boundingClientRect(),t.exec((function(t){n.menutop=t[0].top}))},onPageScroll:function(n){this.rect=n.scrollTop},onReachBottom:function(){this.loadmore=!0,this.uniload="loading",this.pageid++,this.pullon()},onPullDownRefresh:function(){var t=this,e=this.nav;this.pageid=0,this.Articleend=[],(0,o.request_02)(e,this.pageid).then((function(e){t.Articleend=e.data,n.stopPullDownRefresh()})).catch((function(n){console.error(n)}))},computed:c({},(0,i.mapState)(["list","navmin","navminobj","store_nonedata","uni_load"]),{count:function(){this.Articleend=this.list.listing},countloading:function(){this.loadinglist=this.navmin},navdata:function(){this.loadinglist=this.navminobj.loading,this.nav=this.navminobj.naving,this.pageid=this.navminobj.navPageid,this.loadmore=this.uni_load,this.x_nonedata=this.navminobj.nonedata},noneData:function(){this.x_nonedata=this.store_nonedata},namepage:function(){this.rect>this.menutop-20?this.isShow=!0:this.isShow=!1}})};t.default=j}).call(this,e("543d")["default"])}},[["f1a0","common/runtime","common/vendor"]]]);
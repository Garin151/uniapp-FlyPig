(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/city/city"],{"3d91":function(t,e,n){},"4e87":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("8af1");function a(t){return u(t)||c(t)||i(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){if(t){if("string"===typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function u(t){if(Array.isArray(t))return s(t)}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var f=n("7175"),d=new f({key:"2B5BZ-JH7CX-JFR4X-7FUUI-5QGFF-CUFV7"}),l={name:"city_page",data:function(){return{citys:[{name:"桂林市"},{name:"北京市"},{name:"上海市"},{name:"广州市"},{name:"深圳市"},{name:"杭州市"}],citynone:!0,keywords:"",citydata:[],address:"",pageRouter:""}},methods:{searchCity:function(){this.citynone=!1},canCel:function(){this.citynone=!0,this.keywords="",this.citydata=""},addRess:function(){var t=this;(0,r.addressData)().then((function(e){t.address=e.result.ad_info.city})).catch((function(e){console.log("用户拒绝定位"),t.address="桂林市"}))},clickCity:function(){var t=this.address;this.rouTes(t)},hotCity:function(t){this.rouTes(t)},rouTes:function(e){"pages/strategy/strategy"==this.pageRouter?this.$store.commit("citymuta",e):this.$store.commit("travelmuta",e),t.navigateBack({delta:1})},searchInput:function(t){var e=this;d.getSuggestion({keyword:t.detail.value,filter:"category=景点",success:function(t){var n=t.data,r=t.data[0].city,o=n.map((function(t){return t.title})),i=[r].concat(a(o));e.citydata=i},fail:function(t){console.log(t)}})},seekCity:function(t){this.rouTes(t)}},created:function(){var t=getCurrentPages(),e=t[t.length-2].route;console.log(e),this.pageRouter=e},mounted:function(){this.addRess()}};e.default=l}).call(this,n("543d")["default"])},6397:function(t,e,n){"use strict";n.r(e);var r=n("4e87"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},c56d:function(t,e,n){"use strict";(function(t){n("144c");r(n("66fd"));var e=r(n("c6fb"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},c6fb:function(t,e,n){"use strict";n.r(e);var r=n("f1e4"),a=n("6397");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("d3a3");var i,c=n("f0c5"),u=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"2448ac3e",null,!1,r["a"],i);e["default"]=u.exports},d3a3:function(t,e,n){"use strict";var r=n("3d91"),a=n.n(r);a.a},f1e4:function(t,e,n){"use strict";var r,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}))}},[["c56d","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/components/banner"],{3898:function(n,t,e){"use strict";var r,a=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return r}))},"38be":function(n,t,e){"use strict";e.r(t);var r=e("c8f9"),a=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=a.a},8741:function(n,t,e){"use strict";var r=e("8dcb"),a=e.n(r);a.a},"8dcb":function(n,t,e){},"9c6a":function(n,t,e){"use strict";e.r(t);var r=e("3898"),a=e("38be");for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);e("8741");var c,i=e("f0c5"),o=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],c);t["default"]=o.exports},c8f9:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"D_banner",props:{imgArray:Array,detailData:String,leaveword:Array},data:function(){return{imgNumber:0,add:1}},methods:{bannerNum:function(n){this.imgNumber=n.detail.current},preImage:function(t){n.previewImage({current:t,urls:this.imgArray}).then((function(n){})).catch((function(n){console.log("预览失败")}))}}};t.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/detail/components/banner-create-component',
    {
        'pages/detail/components/banner-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9c6a"))
        })
    },
    [['pages/detail/components/banner-create-component']]
]);

//定位
// 引入SDK核心类
var QQMapWX = require('common/qqmap-wx-jssdk.js');
var qqmapsdk;

var addressData = function() {
	return new Promise((resolve,reject) =>{
		qqmapsdk = new QQMapWX({
			key: '2B5BZ-JH7CX-JFR4X-7FUUI-5QGFF-CUFV7'
		})
		qqmapsdk.reverseGeocoder({
			success: res =>{
				resolve(res)
			},
			fail:err =>{
				reject(err)
			}
		})
	})
}


export {addressData}
	
//请求轮播,tab数据
const db = wx.cloud.database()

let request = function(event) {
	return new Promise((resolve,reject) =>{
		const SQL_Banner = db.collection(event)
		SQL_Banner.get().then(res =>{
			resolve(res)
		}).catch(err =>{
			reject(err)
		})
	})
}
//首页数据请求,一次请求6条数据
let request_02 = function(event,pageid) {
	return new Promise((resolve,reject) =>{
		const SQL_Banner = db.collection(event)
		SQL_Banner.limit(6).skip(pageid * 6).get().then(res =>{
			resolve(res)
		}).catch(err =>{
			reject(err)
		})
	})
}

export {request,request_02}
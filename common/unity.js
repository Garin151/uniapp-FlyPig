var login = function(user) {
	return new Promise((resolve,reject) =>{
		let db = wx.cloud.database()
		let SQL_User = db.collection("SQL-User")
		SQL_User.add({
			data:user
		}).then(res =>{
			resolve(res)
		}).catch(err =>{
			reject(err)
		})
	})
}


export {login}
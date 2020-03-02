var previewImage = function(index,pre_list) {
	return new Promise((resolve,reject) =>{
		uni.previewImage({
			current:index,
			urls:pre_list,
			longPressActions:{
				itemList:["发送给朋友","保存图片","收藏"],
				success: res =>{
					//console.log(res)
				},
				fail: err =>{
					console.log(err)
				}
			}
		}).then(res =>{
			resolve(res)
		}).catch(err =>{
			reject(err)
		})
	})
}

export {previewImage}
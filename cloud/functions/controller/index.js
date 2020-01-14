const cloud = require('wx-server-sdk')

cloud.init({
	env: 'timepostoffice-3w444',
	traceUser: true,
})

const wxContext = cloud.getWXContext()
const db = cloud.database()

exports.main = async (event, context) => {
	let { api, payload = {}, userInfo: { openId } } = event

	//获取openid
	if(api === 'getOpenid'){
		return {
			openId
		}
	}

	//新建用户&获取数据库中的用户
	else if (api === 'setUser') {
		return db.collection('User').where({openId,}).get()
			.then(res=>{
				if(res.data[0]){
					return res.data[0]
				}else{
					payload.openId = openId
					return db.collection('User').add({
						data: payload
					})
						.then(res => {
							return { code: 'success', msg: '插入数据成功' }
						})
						.catch(err => {
							return { code: 'fail', msg: '插入数据失败' }
						})
				}
			})
	}

	//新建邮件
	else if (api === 'setMail') {
		payload.openId = openId
		return db.collection('Mail').add({
			data: payload
		})
			.then(res => {
				return { code: 'success', msg: '插入数据成功' }
			})
			.catch(err => {
				return { code: 'fail', msg: '插入数据失败' }
			})
	}

	//获取邮件列表
	else if (api === 'getMailList') {
		return db.collection('Mail').where({openId}).get()
			.then(res=>res.data)
	}

	//获取邮件列表
	else if (api === 'getMailDetail') {
		return db.collection('Mail').where({_id:payload}).get()
			.then(res=>res.data)
	}


}
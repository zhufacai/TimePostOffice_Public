import Taro from '@tarojs/taro'
Taro.cloud.init()
const server = {

    //获取userInfo
    getUserInfo: ()=>{
        return Taro.getUserInfo()
            .then((res) => res.userInfo)
            .catch((err)=>err)
    },

    //获取openId
    getOpenId: () => {
        return Taro.cloud
            .callFunction({
                name: "controller",
                data: {
                    api:'getOpenid',
                }
            })
            .then(res => res.openId)  
            .catch(err => err)
    },

    //设置用户
    setUser: (userInfo)=>{
        return Taro.cloud
            .callFunction({
                name: "controller",
                data: {
                    api:'setUser',
                    payload: userInfo
                }
            })
            .then(res => res)  
            .catch(err => err)
    },

    //新建邮件
    setMail: (mailInfo)=>{
        return Taro.cloud
            .callFunction({
                name: "controller",
                data: {
                    api:'setMail',
                    payload: mailInfo
                }
            })
            .then(res => res)  
            .catch(err => err)
    },

    //获取邮件列表
    getMailList: ()=>{
        return Taro.cloud
            .callFunction({
                name: "controller",
                data: {
                    api:'getMailList',
                    payload: {}
                }
            })
            .then(res => res)  
            .catch(err => err)
    },
    //获取邮件详情
    getMailDetail: (_id)=>{
        return Taro.cloud
            .callFunction({
                name: "controller",
                data: {
                    api:'getMailDetail',
                    payload: _id
                }
            })
            .then(res => res)  
            .catch(err => err)
    }

}

export default server
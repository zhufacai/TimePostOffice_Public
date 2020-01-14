import Taro from '@tarojs/taro'

/**
 * 封装请求方法
 * @param { funcName } 云函数方法名 
 * @param { api } 云函数方法内某个接口 
 * @param { payload } 参数 
 */

Taro.cloud.init()

const fetch = ({ funcName = 'controller', api, payload }) => {
    console.log(Taro.getStorageSync('openid'))
    return Taro.cloud
        .callFunction({
            name: funcName,
            data: {
                "api":api,
                // "openid": Taro.getStorageSync('openid'),
                "payload":payload
            }
        })
            .then(res => {
                return res.result
            })
            .catch(err=>{
                return err
            })
}

export default fetch
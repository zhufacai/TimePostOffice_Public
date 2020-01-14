import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'
import _fetch from './utils/fetch.js'

import server from './utils/server.js'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      "pages/my/index",
      "pages/writeMail/index",
      "pages/mailDetail/index",
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '时光邮局',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/index/index",
        iconPath: "./assets/tab-bar/mail.png",
        selectedIconPath: "./assets/tab-bar/mail_active.png",
        text: "信"
      }, {
        pagePath: "pages/my/index",
        iconPath: "./assets/tab-bar/my.png",
        selectedIconPath: "./assets/tab-bar/my_active.png",
        text: "我的"
      }]
    },
    cloud: true
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
      this.init()
    }
  }



  init = () => {
    // const userInfo =  {
    //   "province": "Hunan",
    //   "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epiaZXfjZuGU9ZdAnUdp4ias1ibywfPNvgTH8p9sO9UhLNF8uwPuXtskHMKcWVKpyPwAktvvhWAZxPfg/132",
    //   "city": "Changsha",
    //   "country": "China",
    //   "gender": 1.0,
    //   "nickName": "I'm fine",
    //   "openId": "o1fRW4yg4MBym1qL6buWv0360n3s"
    // }
    // server.getUserInfo().then(res=>{
    //   server.setUser(res).then(res=>console.log({res}))
    // })
    // server.setUser(userInfo).then(res=>console.log({res}))
  }



  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

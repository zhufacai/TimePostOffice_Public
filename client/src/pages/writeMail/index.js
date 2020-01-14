import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Textarea, Image } from '@tarojs/components'
import style from './index.module.scss'
import server from '../../utils/server.js'
import bg from '../../assets/timg.jpg';
import icon_send from '../../assets/icon_send.png';

const contentplaceholder = '你也许以前试过给过去的自己写信，向年轻时的自己传授一些人生的智慧和观点，你希望那时的自己就能知道这些。现在我们换个角度看问题，如果让你给未来的自己写封信，你会写点什么？想象一下，给5年后的自己写一封信，当5年后你打开那封信时，你会产生多少共鸣。也许当你给未来的自己写信时，你会慢慢理清希望自己在人生旅途的那个特定时刻变成什么样子。'
export default class writeMail extends Component {
  config = {
    navigationBarTitleText: '时光邮局'
  }

  constructor(props){
    super(props)
    this.state = {
      name:'',
      toEmail:'',
      content:'',
      createTime:'',
      sendTime:'',
      sendFlag:false,

      showTime:'',

      clickFlag:false,   //点击提交 flag
    }
  }

  stopRepeatClick = () => {
    this.setState({clickFlag:true})
    setTimeout(() => {
      this.setState({clickFlag:false})
    }, 3000);
  }

  sendMail = () => {

    if(this.state.clickFlag){
      return
    }
    this.stopRepeatClick()

    let { name, toEmail, content, sendTime, sendFlag } = this.state
    if(!name){
      Taro.showToast({
        title:'请署名~',
        icon:'none'
      })
      return
    }
    if(!toEmail){
      Taro.showToast({
        title:'目的地是哪呢？',
        icon:'none'
      })
      return
    }
    if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(toEmail)){
      Taro.showToast({
        title:'邮箱地址不合规范',
        icon:'none'
      })
      return
    }
    if(!sendTime){
      Taro.showToast({
        title:'什么时候寄出呢？',
        icon:'none'
      })
      return
    }
    if(sendTime < ~~((new Date()).getTime()/1000)){
      Taro.showToast({
        title:'不可以穿越到过去哦~',
        icon:'none'
      })
      return
    }

    if(!content){
      Taro.showToast({
        title:'还没写内容呢！',
        icon:'none'
      })
      return
    }

    let payload = { name, toEmail, content, sendTime, sendFlag, createTime:Number(new Date().getTime()/1000) }
    server.setMail(payload).then(res=>{
      if(res.result.code === 'success'){
        Taro.showToast({
          title:'邮件已收寄，等待投递~',
          icon:'none'
        })
        setTimeout(() => {
          Taro.switchTab({
            url:'/pages/my/index'
          })
        }, 2000);
      }
    })

  }
  
  onDateChange = e => {
    this.setState({
      showTime: e.detail.value,
      sendTime: this._disposeTime(e.detail.value)/1000
    })
  }

  //根据日期字符串获取时间戳
  _disposeTime(dateString){
    return dateString ? new Date(dateString).getTime() : new Date().getTime()
  }

  render () {
    return (
      // style={`background: url(${bg}) left top / cover no-repeat;`}
      <View className={style.wrapper} >

        <View className={style.msgInputBox}>
          <Input 
            className={style.input}
            placeholder="署名：花花"
            value={this.state.name}
            onInput={(e)=>{this.setState({name:e.detail.value})}}
          />
        </View>
        <View className={style.msgInputBox}>
          <Input 
            className={style.input}
            placeholder="目的地：love@sina.com"
            value={this.state.toEmail}
            onInput={(e)=>{this.setState({toEmail:e.detail.value})}}
          />
        </View>
        <View className={style.msgInputBox}>
          <Picker mode='date' onChange={this.onDateChange}>
            <Input 
              className={style.input}
              placeholder="发送时间：2025-05-20"
              disabled
              value={this.state.showTime}
            />
          </Picker>
        </View>

        <Textarea 
          className={style.contentInput} 
          placeholder={contentplaceholder}
          value={this.state.content}
          onInput={(e)=>{this.setState({content:e.detail.value})}}
        />

        <Image 
          className={style.icon_send}
          src={icon_send}
          mode="widthFix"
          onClick={this.sendMail}
        />

      </View>
    )
  }
}

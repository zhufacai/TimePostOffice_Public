import Taro, { Component } from '@tarojs/taro'
import { View, Input, Picker, Textarea, Image } from '@tarojs/components'
import style from './index.module.scss'
import server from '../../utils/server.js'
import bg from '../../assets/timg.jpg';
// import icon_send from '../../assets/icon_send.png';

const contentplaceholder = '你也许以前试过给过去的自己写信，向年轻时的自己传授一些人生的智慧和观点，你希望那时的自己就能知道这些。现在我们换个角度看问题，如果让你给未来的自己写封信，你会写点什么？想象一下，给5年后的自己写一封信，当5年后你打开那封信时，你会产生多少共鸣。也许当你给未来的自己写信时，你会慢慢理清希望自己在人生旅途的那个特定时刻变成什么样子。'
export default class mailDetail extends Component {
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

      showTime:''
    }
  }

  componentDidMount(){
    this.init()
  }

  init = () => {
    let { _id } = this.$router.params
    console.log({_id})
    server.getMailDetail(_id).then(res=>{
      let { name, sendTime, toEmail, content } = res.result[0]
      this.setState({name, showTime:this.getDate(sendTime), toEmail, content})
    })
  }  

  //时间戳转日期
  getDate = (nS) => { 
    let date=new Date(parseInt(nS)* 1000);
    let year=date.getFullYear();
    let mon = date.getMonth()+1;
    let day = date.getDate();
    return this.addZaro(year)+'-'+this.addZaro(mon)+'-'+this.addZaro(day);
  }

  addZaro = (num) => {
    return num > 9 ? num : '0'+num
  }

  render () {
    return (
      <View className={style.wrapper} >

        <View className={style.msgInputBox}>
          <Input 
            className={style.input}
            placeholder="署名：花花"
            disabled
            value={`署名：${this.state.name}`}
            onInput={(e)=>{this.setState({name:e.detail.value})}}
          />
        </View>
        <View className={style.msgInputBox}>
          <Input 
            className={style.input}
            placeholder="目的地：love@sina.com"
            disabled
            value={`目的地：${this.state.toEmail}`}
            onInput={(e)=>{this.setState({toEmail:e.detail.value})}}
          />
        </View>
        <View className={style.msgInputBox}>
            <Input 
              className={style.input}
              placeholder="发送时间：2025-05-20"
              disabled
              value={`发送于：${this.state.showTime}`}
            />
        </View>

        <Textarea 
          className={style.contentInput} 
          placeholder={contentplaceholder}
          disabled
          value={this.state.content}
          onInput={(e)=>{this.setState({content:e.detail.value})}}
        />

      </View>
    )
  }
}

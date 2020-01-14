import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import NullPage from '../../components/nullPage/nullPage'
import server from '../../utils/server.js'
import { AtTabs, AtTabsPane, AtCard  } from 'taro-ui'

import style from './index.module.scss'
import './tab.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '时光邮局'
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      mailList:[]
    }
  }

  componentDidShow () {
    this.init()
  }

  init = ()=>{
    server.getMailList().then(res=>{
      if(res.result){
        this.setState({mailList:res.result})
      }
    })
  }


  handleClick (value) {
    this.setState({
      current: value
    })
  }

  _dispostList = (list) => {
    let left = [];
    let right = [];
    for(let i in list){
      if(list[i].sendFlag){
        right.push(list[i])
      }else{
        left.push(list[i])
      }
    }
    return { left, right }
  }

  getDate(nS) {
    let date=new Date(parseInt(nS)* 1000);
    let year=date.getFullYear();
    let mon = date.getMonth()+1;
    let day = date.getDate();
    return this.addZaro(year)+'-'+this.addZaro(mon)+'-'+this.addZaro(day);
  }

  addZaro(num){
    return num > 9 ? num : '0'+num
  }

  handleLeft = () => {
    Taro.showToast({
      title:'悟已往之不谏，知来者之可追~',
      icon:'none'
    })
  }

  handleRight(id){
    Taro.navigateTo({
      url:`/pages/mailDetail/index?_id=${id}`
    })
  }

  render () {

    const tabList = [{ title: '待寄出' }, { title: '已寄出' }]

    const { left, right } = this._dispostList(this.state.mailList)


    return (
      <View className={style.wrapper}>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View className={style.contentBox}>
              {
                left.length > 0 ? 
                left.map((item)=>
                <View 
                className={style.cardBox}
                key={item._id}
                onClick={this.handleLeft}
                >
                  <AtCard
                    note={`将在${this.getDate(item.sendTime)}寄给${item.toEmail}`}
                    title={item.name}
                  />
                </View>
                )
                :
                <NullPage tips="还没有内容哦~" />
              }
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className={style.contentBox}>
            {
                right.length > 0 ?
                right.map((item)=>
                <View 
                  className={style.cardBox}
                  key={item._id}
                  onClick={this.handleRight.bind(this,item._id)}
                >
                  <AtCard
                    note={`已于${this.getDate(item.sendTime)}上午10:00寄给${item.toEmail}`}
                    title={item.name}
                  />
                </View>
                )
                :
                <NullPage tips="还没有内容哦~" />
              }
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

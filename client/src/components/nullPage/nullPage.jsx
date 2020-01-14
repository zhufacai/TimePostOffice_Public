import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import style from './nullPage.module.scss'
import icon_null_page from '../../assets/icon_null_page.png';



export default class NullPage extends Component {
    constructor(props){
        super(props)
    }

  render () {
    return (
      <View className={style.wrapper}>
        <Image className={style.icon} src={icon_null_page} mode="widthFix" />
        <View>{this.props.tips}</View>
      </View>
    )
  }
}

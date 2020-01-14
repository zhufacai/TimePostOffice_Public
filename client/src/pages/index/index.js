import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import style from './index.module.scss'

import bg from '../../assets/timg.jpg';
import banner from '../../assets/banner.jpg';

// 时间是让人措不及防的东西，岁月是一场有去无回的旅行。我们永远无法预料未来将会发生什么，也无法挽回已过去的时间。即使回忆消散，岁月漫长，我们可以趁现在给未来的自己写一封信，当数年过后我们看到这封信时，仍然可以沿着记忆的路线，一路回到曾经，去遇见曾经的自己。
// 给现在一个期许，给未来一个回忆
// 你也许以前试过给过去的自己写信，向年轻时的自己传授一些人生的智慧和观点，你希望那时的自己就能知道这些。现在我们换个角度看问题，如果让你给未来的自己写封信，你会写点什么？想象一下，给5年后的自己写一封信，当5年后你打开那封信时，你会产生多少共鸣。也许当你给未来的自己写信时，你会慢慢理清希望自己在人生旅途的那个特定时刻变成什么样子。

const diaryList = [
  { id:'', userid:'', name:'心事', tips:'记录一下每天的小确幸',}
]

export default class Index extends Component {

  config = {
    navigationBarTitleText: '时光邮局'
  }

  handleNewMail = () => {
    // Taro.getSetting({
    //   success(res) {
    //     console.log({res})
    //   }
    // })

    Taro.navigateTo({
      url:'/pages/writeMail/index'
    })
  }

  render () {
    return (
      <View className={style.wrapper} >
         
        <Image className={style.banner} src={banner} mode="widthFix" />

        <View className={style.header}>
          <View className={style.ch}>寄给未来</View>
          <View className={style.en}>Mail To Future</View>
        </View>
        <View className={style.content}>
          <View className={style.content_head}>关于寄给未来的注解：</View>
          <View className={style.content_paragraph}>时间是让人措不及防的东西，岁月是一场有去无回的旅行。</View>
          <View className={style.content_paragraph}>我们永远无法预料未来将会发生什么，也无法挽回已过去的时间。即使回忆消散，岁月漫长.....</View>
          <View className={style.content_paragraph}>我们可以趁现在给未来的自己或Ta写一封信，当数年过后看到这封信时，仍然可以沿着记忆的路线，一路回到曾经，去遇见曾经的自己。</View>
        </View>
        <View 
          className={style.btn} 
          onClick={this.handleNewMail}
        >我也写一封</View>
      </View>
    )
  }
}

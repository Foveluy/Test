import React, { Component } from 'react'
import { View, Platform, Text } from 'react-native'
import { CustomTabBar } from '../components/CustomTabBar'
import { width, height } from '../util'

/**
 * 高阶组件，输入一个component会自动的给这个component加上一个tabbar
 * @param {*} Cpn:react 的component
 * @param {array} TabItem:Tabbar上的按钮
 * @param {array} TabColor:每个按钮的颜色
 * @param {bool} update:tabbar是否拥有更新能力
 */
export const PageWithTab = (Cpn, TabItem, TabColor = ['white'], update = false) => {
  return class Wrapper extends Component {
    CustomTabBarPress = (e, child, index) => {
      if (this.page.CustomTabBarPress === void 666) {
        throw new Error('PageWithTab 组件必须定义一个 CustomTabBarPress(e, child, index)方法')
      }
      this.page.CustomTabBarPress.call(this.page, e, child, index)
    }

    render() {
      return (
        <View
          style={{
            height: height - 44 - (Platform.OS === 'ios' ? 0 : 24)
          }}
        >
          <Cpn {...this.props} ref={node => (this.page = node)} />
          <CustomTabBar
            shouldUpdate={update}
            onPress={this.CustomTabBarPress}
            childColor={(child, index) => {
              if (TabColor && TabColor[index] === void 666) {
                return 'white'
              }
              if (TabColor && TabColor[index]) {
                return TabColor[index]
              }
              return 'white'
            }}
          >
            {React.Children.map(TabItem, (item, index) => {
              return <Text style={{ backgroundColor: 'transparent', color: 'black' }}>{item}</Text>
            })}
          </CustomTabBar>
        </View>
      )
    }
  }
}

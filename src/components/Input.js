/**
 * 2017/10/31 方正 创建
 * TextInput组件
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'

export class Input extends Component {
    static defaultProps = {
        size: 'default',
        password: false
    }
    render() {
        const size = {
            large: 14,
            small: 10,
            default: 12
        }
        const {
            addonBefore,
            onFocus,
            placeholder,
            returnKeyType,
            password,
            onBlur,
            onChangeText
        } = this.props
        return (
            <View
                style={{
                    borderBottomWidth: 0.5,
                    borderColor: 'rgba(120,120,120,0.2)',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {addonBefore ? <Text style={{ width: 80, paddingLeft: 14, fontSize: 14, paddingTop: size[this.props.size], paddingBottom: size[this.props.size] }}>{addonBefore}</Text> : null}
                <TextInput
                    style={{
                        width: "70%",
                        paddingLeft: 10,
                        paddingTop: size[this.props.size],
                        paddingBottom: size[this.props.size],
                        fontSize: 14
                    }}
                    secureTextEntry={password}
                    value={this.props.value}
                    onChangeText={(text) => { onChangeText(text, this.props.name) }}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    returnKeyType={returnKeyType || 'done'}
                    onBlur={onBlur}
                />
            </View>
        )
    }
}
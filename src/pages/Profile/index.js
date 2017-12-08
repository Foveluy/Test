/**
 * 2017/10/26 方正 创建
 * 本页面是用于个人登陆、个人信息等功能
 */
import React from 'react'
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import { connect } from 'react-redux'

import ManifestPage from '../Manifest'
import Profile from './profile'
import Person from '../Person'
import Address from '../Address'
import DetailPage from '../Detail';
import GoodState from '../GoodState';
import Cart from '../Cart';
import Settle from '../Settle';
import Deposite from '../DepositeLog';
import Password from '../Password';
import Login from '../Login';



const ProfileInstace = null;
let _profile = null;

const ProfileHOC = () => {
    return class Wrapper extends React.Component {
        constructor(props, context) {
            super(props, context);
            ProfileInstace = this;
        }
        static navigationOptions = {
            header: null,
            tabBarOnPress: (obj, jump) => { ProfileInstace.onTabPress(obj, jump) }
        }
        onTabPress({ route, index }, jump) {
            this.refs.Profile.checkLogin()
            this.refs.Profile.fetchBalance()
            jump(index)
        }
        componentDidMount() {
            _profile = this.refs.Profile;
        }
        render() {

            return (
                <View>
                    <Profile
                        {...this.props}
                        refreshAll={this.props.refreshAll}
                        ref='Profile'
                    />
                </View>
            )
        }
    }
}

const mapDispatch = (dispatch) => {

    return {
        refreshAll: () => {
            dispatch({ type: 'fetchHome' })
            dispatch({ type: 'FetchList' })
        },
        dispatch: dispatch
    }
}

connected = connect(null, mapDispatch)(ProfileHOC())

export default StackNavigator({
    Profile: {
        screen: connected,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: (props) => <Login {...props} Profile={_profile} />,
        navigationOptions: {
            header: null,
            tabBarVisible: false,
            gesturesEnabled: true
        }
    },
}, {
        initialRouteName: 'Profile',
        mode: 'card',
        headerMode: 'screen'
    }
)


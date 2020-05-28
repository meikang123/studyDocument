import React from "react"
import { List, InputItem, Radio, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class Registry extends React.Component {
    constructor() {
        super();
        this.state = {
            type: 'genius' // 或者boss
        }
    }

    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                <h2>注册页</h2>
                <List>
                    <InputItem>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type === 'genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}>
                        BOSS
                    </RadioItem>
                </List>
            </div>
        )
    }
}

export default Registry

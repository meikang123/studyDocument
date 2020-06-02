import React from "react"
import { List, InputItem, Radio, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { registry } from '../../redux/user.redux'

@connect(
    state => state.user,
    { registry }
)
class Registry extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'genius' // 或者boss
        }
        this.handleRegistry = this.handleRegistry.bind(this);
    }

    handleChange(key, val) { // 数据变化
        this.setState({
            [key]: val
        })
    }

    handleRegistry() { // 注册
        console.log(this.state);
        this.props.registry(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <h2>注册页</h2>
                <List>
                    { this.props.msg ? <p>{this.props.msg}</p> : null }
                    <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type === 'genius'} onChange={() => this.handleChange('type', 'genius')}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>
                        BOSS
                    </RadioItem>
                    <Button type="primary" onClick={this.handleRegistry}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Registry

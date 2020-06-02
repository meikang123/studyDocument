import React from "react"
import Logo from "../../components/logo/logo"
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { login } from './../../redux/user.redux'
import {Redirect} from "react-router-dom"

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pwd: ''
        };
        this.registry = this.registry.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    registry() {
        this.props.history.push('/registry');
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogin() { // 登录
        this.props.login(this.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <h2>登陆页</h2>
                { this.props.msg ? <p>{this.props.msg}</p> : null }
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.registry}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login

import React from "react"
import Logo from "../../components/logo/logo"
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class Login extends React.Component {
    constructor() {
        super();
        this.registry = this.registry.bind(this)
    }

    registry() {
        this.props.history.push('/registry');
    }

    render() {
        return (
            <div>
                <Logo />
                <h2>登陆页</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary">登陆</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.registry}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login

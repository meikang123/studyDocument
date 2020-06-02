import React from "react"
import { NavBar } from 'antd-mobile'
import AvatarSelector from './../../components/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS</NavBar>
                <AvatarSelector></AvatarSelector>
            </div>
        )
    }
}

export default BossInfo

import React from 'react';
import './App.css';
import { Toast, Button } from 'antd-mobile'

function aa() {
    console.log(1111);
}

@aa
class App extends React.Component {

    componentDidMount() {
        Toast.info('This is a toast tips !!!', 100);
    }

    render() {
        return (<div className="App">
            <Button>Default</Button>
        </div>);
    }
}

export default App;

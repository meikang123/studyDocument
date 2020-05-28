import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Login from './containers/login/login'
import Registry from "./containers/registry/registry"

const store = createStore(function() {
    return {}
}, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login' component={Login}></Route>
                <Route path='/registry' component={Registry}></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    /*<React.StrictMode>
        <App/>
    </React.StrictMode>,*/
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

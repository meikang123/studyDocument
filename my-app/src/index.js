import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// route
import AuthRouter from './components/authroute/authRoute'
import Login from './containers/login/login'
import Registry from "./containers/registry/registry"
import bossInfo from "./containers/bossInfo/bossInfo"



// redux
import reducer from "./reducer"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter />
                <Route path='/bossInfo' component={bossInfo}></Route>
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

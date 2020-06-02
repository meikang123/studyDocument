import axios from 'axios'
import { getRedirectPath } from './../utils'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTRY_SUCCESS = 'REGISTRY_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
};

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTRY_SUCCESS:
            return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload }

        case LOGIN_SUCCESS:
            return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload }

        case LOAD_DATA:
            return { ...state, isAuth: true, msg: '', ...action.payload }

        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }

        default:
            return state
    }
}

function registrySuccess(data) {
    return { type: REGISTRY_SUCCESS, payload: data }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG };
}

function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data }
}

/*
* 更新用户信息
* */
export function loadData(userInfo) {
    return { type: LOAD_DATA, payload: userInfo }
}

/*
* 注册
* */
export function registry({user, pwd, repeatPwd, type}) {
    if(!user || !pwd) {
        return errorMsg('请输入用户名或密码')
    }

    if(pwd !== repeatPwd) {
        return errorMsg('两次密码不同')
    }

    return dispatch => {
        axios.post('/user/registry', {user, pwd, type}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(registrySuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

/*
* 登录
* */
export function login({ user, pwd }) {
    if(!user || !pwd) {
        return errorMsg('请输入用户名或密码')
    }

    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                // dispatch(registrySuccess({ user, pwd }));
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

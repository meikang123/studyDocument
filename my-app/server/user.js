const express = require('express');
const Router = express.Router();

const utils = require('utility')
const model = require('./model');
const User = model.getModel('user');

const _filter = {'pwd': 0, '__v': 0}

/*
* 密码复杂化
* */
function md5Pwd(pwd) {
    const salt = 'immmm@dfsfsdf~~~~';
    return utils.md5(utils.md5(pwd + salt))
}

/*
* 用户列表
* */
Router.get('/list', function(req, res) {
    // 清空数据
    // User.remove({}, function (e, d) { })
    User.find({}, function(err, doc) {
        return res.json({code: 0, data: doc});
    })
})

/*
* 用户注册
* */
Router.post('/registry', function(req, res) {
    console.log(req.body);
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc) {
        if(doc) return res.json({code: 1, msg: '用户名重复！'});

        const userModel = new User({ user, pwd: md5Pwd(pwd), type })
        userModel.save(function (e, d) {
            if(e) return res.json({code: 1, msg: '后端出错了！'})
            const { user, _id, type } = d;
            res.cookie('userId', _id);
            return res.json({code: 0, data: {user, _id, type}})
        })
    })
})

/*
* 用户登录
* */
Router.post('/login', function(req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
        if(!doc) return res.json({code: 1, msg: '用户名不存在或者密码错误'})
        res.cookie('userId', doc._id);
        return res.json({code: 0, data: doc});
    })
})

/*
* 用户信息
* */
Router.get('/info', function(req, res) {
    const {userId} = req.cookies;
    if(!userId) return res.json({ code: 1 })
    User.findOne({_id: userId}, _filter, function (err, doc) {
        if(err) return res.json({code: 1, msg: '后端出错！'})
        if(doc) return res.json({code: 0, data: doc})
    })
})

module.exports = Router;

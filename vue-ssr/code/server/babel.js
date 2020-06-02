require('babel-register')({ // babel编译
    plugins: ['babel-plugin-transform-es2015-modules-commonjs'],
})
module.exports = require('./index.js')

const webpack = require('webpack')
const path = require('path')
const config = require('./build/config');

console.log(config);

const webpackConfig = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: 'node'
};

/*
* create compiler
* */
const compiler = webpack(webpackConfig)

console.log(path.resolve(__dirname, 'dist'))

compiler.hooks.failed.tap('create', msg => {
  // console.log(msg);
})

compiler.run((err, stats) => {
  console.log(err);
})




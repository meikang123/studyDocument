const Config  = require('webpack-chain');
const config = new Config();

config.resolve.alias.set('@', './src').set('@utils', '@/utils');

module.exports = config.toString();

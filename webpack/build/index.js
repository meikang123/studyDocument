const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')


const client = webpack(baseConfig);
client.watch({}, (err, stats) => {
    stats = stats.toJson()
    console.log(stats);
})

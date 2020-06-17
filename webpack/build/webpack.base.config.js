/*module.exports = {
    entry: './src/app.js'
}*/

const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve('./build/q.png'), function(err, data) {
    console.log(new Blob([data]));
});
//



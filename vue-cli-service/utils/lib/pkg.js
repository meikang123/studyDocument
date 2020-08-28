const fs = require('fs');
const path = require('path');
const readPkg = require('read-pkg');

exports.resolvePkg = function (context) {
  if(fs.exitsSync(path.join(context, 'package.json'))) {
    return readPkg.sync({ cwd: context })
  }
  return  {}
}

const { override, fixBabelImports, addDecoratorsLegacy } = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', { "libraryName": "antd-mobile", "style": "css" })
);


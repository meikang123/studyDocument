module.exports = function(api) {
  // console.log(api);
  api.cache(true);

  // 添加预设
  const presets = [
    ["@babel/preset-env",
      // 配置polyfill --usage会根据代码按需添加
      {
        "useBuiltIns": 'usage',
        "corejs": 3,
        // 配置需要兼容的版本
        "targets": {
          "chrome": "40",
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }
    ]
  ];

  // 箭头转函数
  const plugins = [
    "@babel/plugin-transform-arrow-functions",
    [
      // 用来解决文件体积过大，将语法转换抽离成单独模块
      "@babel/plugin-transform-runtime",

      // 用来解决polyfill 按需引入的全局命名空间
      { corejs: 3 }
    ]
  ];

  return { presets, plugins }
}

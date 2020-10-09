/*
*
* 在项目根目录（与 package.json 文件同级）
* 创建 .eslintrc.* 文件。ESLint 的配置文件，
* 可以是 .eslintrc.js、.eslintrc.cjs、.eslintrc.yaml、.eslintrc.yml、.eslintrc.json、.eslintrc（已弃用）或者 package.json（第一种方法），
* 优先级依次递减，层叠配置使用离要检测的文件最近的 .eslintrc 文件作为最高优先级，然后才是父目录里的配置文件，以此类推。
* */

module.exports = {
  parserOptions: {
    "ecmaVersion": 6,
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "indent": ["error", 2]
  }
};

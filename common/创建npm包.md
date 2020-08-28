#### 创建NPM包
1. 注册用户--注册地址：https://www.npmjs.com/signup
2. cmd到命令行
    - npm login 进行登录需要用户名和密码
    - 创建包文件夹切换到文件夹下初始化 npm init
    - 创建完成后新建index.js 写入module.export = 'test'保存
    - 发布包 npm publish testxxxxx
3. 撤销发布的版本
    - npm --force unpublish testxxxx // 用force强制删除
import Koa from 'koa'
import ip from 'ip'
import router from './router/index'
import middleware from './middleware'
import SSR from './ssr'

const app = new Koa()

//使用中间件
middleware(app)

// 接口
router(app)

// vue-ssr
SSR(app)


app.use(async ctx => {
    ctx.body = 'Hello World'
})

app.listen(8888, () => {
    console.log(`server is running at http://${ip.address()}:8888`)
})


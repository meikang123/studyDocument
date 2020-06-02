import koaRouter from 'koa-router'
import path from 'path'
import fs from 'fs'

import movies from "./movies"

const router = koaRouter()

export default app => {
    router.get('/getMovieList', async (ctx, next) => {
        ctx.body = movies;
    })

    router.get('/getMovieDetail', async (ctx, next) => {
        ctx.body = 'getMovieDetail';
    })

    app.use(router.routes()).use(router.allowedMethods())
}

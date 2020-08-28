import Vue from "vue";
import VueRouter from "vue-router";

/*
* 当前路由触发加载当前路由BUG处理
* */
const { push } = VueRouter.prototype;
VueRouter.prototype.push = function (location, onResolve, onReject) {
  if(onResolve || onReject) return push.call(this, location, onResolve, onReject);
  return push.call(this, location).catch(err => err);
}

/*
 *  Layout
 * */
import Layout from "@/layout/index";

Vue.use(VueRouter);

export const defaultRoutes = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "common" */ '@/views/404/index'),
    hidden: true
  }
]

/*
 * 路由配置
 * */
export const authRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import(/* webpackChunkName: "home" */ "@/views/home/index"),
        name: "Home",
        meta: { title: "首页",  icon: 'dashboard' }
      }
    ]
  }, {
    path: "/icon",
    component: Layout,
    redirect: "index",
    meta: { title: '图标', icon: 'icon', auth: ['admin'] },
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "common" */ "@/views/icon/index"),
        name: "图标",
        meta: { title: "图标" }
      }
    ]
  }, {
    path: "/vue",
    component: Layout,
    redirect: "index",
    meta: { title: 'VUE', icon: 'guide', auth: ['admin'] },
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "vue" */ "@/views/vue/index"),
        name: "event",
        meta: { title: "事件" }
      }, {
        path: "lazy",
        component: () => import(/* webpackChunkName: "vue" */ "@/views/vue/lazy"),
        name: "lazy",
        meta: { title: "图片懒加载" }
      }, {
        path: "waves",
        component: () => import(/* webpackChunkName: "vue" */ "@/views/vue/waves"),
        name: "waves",
        meta: { title: "波纹" }
      }, {
        path: "hoc",
        component: () => import(/* webpackChunkName: "vue" */ "@/views/vue/hoc"),
        name: "hoc",
        meta: { title: "高阶组件" }
      }
    ]
  }, {
    path: "/shop",
    component: Layout,
    redirect: "index",
    meta: { title: '商品', icon: 'guide', auth: ['admin'] },
    children: [
      {
        path: "index",
        component: () => import(/* webpackChunkName: "shop" */ "@/views/shop/index"),
        name: "shopIndex",
        meta: { title: "主页" }
      }, {
        path: "container",
        component: () => import(/* webpackChunkName: "shop" */ "@/views/shop/container"),
        name: "shopContainer",
        meta: { title: "详情" }
      }
    ]
  }



  , {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const router = new VueRouter({
  routes: defaultRoutes
});

export default router;

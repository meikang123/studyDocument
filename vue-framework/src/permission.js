import store from './store';
import router, {authRoutes, defaultRoutes} from './router';

router.beforeEach(async (to, from, next) => {
  const { roles } = store.state.user;

  if(roles && roles.length) {

    next();

  } else {
    //设置权限
    store.state.user.roles = ['admin'];

    // 添加路由
    await store.dispatch('user/generateRoutes', [...defaultRoutes, ...authRoutes]);
    router.addRoutes(authRoutes);

    next({ ...to, replace: true });
  }

})

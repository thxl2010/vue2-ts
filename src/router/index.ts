import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath, // 记录要去的页面，登录成功后自动跳转
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

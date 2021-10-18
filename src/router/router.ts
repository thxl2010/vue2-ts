import { RouteConfig } from 'vue-router';
import Layout from '@/layout/index.vue';

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
    meta: { title: 'Edu boss管理系统' },
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: { requiresAuth: true, title: 'Edu boss管理系统' },
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: { requiresAuth: true, title: '角色管理' },
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'
          ),
        meta: { requiresAuth: true, title: '角色菜单管理' },
        props: true, // 将路由路径参数映射到 props 数据中
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () =>
          import(
            /* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'
          ),
        meta: { requiresAuth: true, title: '角色资源管理' },
        props: true, // 将路由路径参数映射到 props 数据中
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: { requiresAuth: true, title: '菜单管理' },
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue'
          ),
        meta: { requiresAuth: true, title: '添加菜单' },
      },
      {
        path: '/menu/edit/:id',
        name: 'menu-edit',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue'
          ),
        meta: { requiresAuth: true, title: '编辑菜单' },
      },
      {
        path: '/resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          ),
        meta: { requiresAuth: true, title: '资源管理' },
      },
      {
        path: '/resource/category',
        name: 'resource-category',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/category.vue'
          ),
        meta: { requiresAuth: true, title: '资源分类' },
      },
      {
        path: '/course',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: { requiresAuth: true, title: '课程管理' },
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () =>
          import(
            /* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'
          ),
        props: true,
        meta: { requiresAuth: true, title: '课程管理 / 营销信息' },
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () =>
          import(
            /* webpackChunkName: 'course-section' */ '@/views/course/section.vue'
          ),
        props: true,
        meta: { requiresAuth: true, title: '课程管理 / 课程结构' },
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: { requiresAuth: true, title: '用户管理' },
      },
      // ! url /advert 会被广告拦截插件拦截
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: { requiresAuth: true, title: '广告管理' },
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
          ),
        meta: { requiresAuth: true, title: '广告位列表' },
      },
    ],
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue'),
  },
];

export default routes;

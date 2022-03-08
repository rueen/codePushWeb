import { createRouter, createWebHistory } from 'vue-router'
import AppsRouter from './views/apps/router'
import CollaboratorsRouter from './views/collaborators/router'
import LoginRouter from './views/login/router'
import Layout from './views/layout/index'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',
    component: Layout,
    children: [
      ...AppsRouter,
      ...CollaboratorsRouter
    ]
  },
  ...LoginRouter
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  const isLogin = !!token;
  if (to.path == '/login') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

export default router

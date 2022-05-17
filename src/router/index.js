import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/UserView.vue'),
  },
  {
    path: '/edit/:blogId',
    name: 'edit',
    component: () => import('@/views/EditView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/detail/:blogId',
    name: 'detail',
    component: () => import('@/views/DetailView.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/MyView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/',
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {
        console.log('not login');
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    });
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;

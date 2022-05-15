import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/edit",
    name: "edit",
    component: () => import("@/views/EditView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/views/CreateView.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/views/DetailView.vue"),
  },
  {
    path: "/my",
    name: "my",
    component: () => import("@/views/MyView.vue"),
  },
  {
    path: "*",
    redirect: "/",
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

export default router;

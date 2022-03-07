import Vue from "vue";
import VueRouter from "vue-router";
import { tasksRouter } from '../modules/tasks/tasksRouter';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import(/* webpackChunkName: "layout" */ "../views/layout"),
    children: [
      
     
      tasksRouter
      
     
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "register" */ "../views/register"),
  },
  
  
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () =>
      import(/* webpackChunkName: "forbidden" */ "../views/Forbidden"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
   /* if (to.fullPath == "/") {
     const token = localStorage.getItem("token");
     if (!token) {
       next("/login");
       return;
     }
   } */
  if (await Vue.prototype.canNext(to)) {
    next();
  } else {
    next();
  }
});

export default router;

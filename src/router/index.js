/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../components/SignIn.vue")
  },
  {
    path: "/addpost",
    name: "addpost",
    component: () =>
    import(/* webpackChunkName: "addpost" */ "../components/AddPost.vue")
  },
  {
    path: "/changepost",
    name: "changepost",
    component: () =>
    import(/* webpackChunkName: "addpost" */ "../components/ChangePost.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
// import store from "@/store";
import { get } from "../utils/request";
const getUsersInfoEffect = function () {
  let userToken = localStorage.getItem("usertoken");

  const getusersInfo = async function () {
    if (userToken) {
      const result = await get("/api/users", { token: userToken });

      return result;
    } else {
      userToken = "";
      console.log("token过期,需要重新登陆");
    }
  };
  return { getusersInfo };
};
const routes = [
  {
    path: "/",
    name: "Home",
    // 异步路由加载
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/Home"),

    beforeEnter(to, from, next) {
      getUsersInfoEffect().getusersInfo();
      next();
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/register/Register.vue"
      ),
  },
  {
    path: "/video/:id",
    name: "video",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/video/video.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    beforeEnter(to, from, next) {},
  },
  {
    path: "/uploadVideo",
    name: "UploadVideo",
    component: () =>
      import(
        /* webpackChunkName: "UploadVideo" */ "../views/upload/Upload.vue"
      ),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

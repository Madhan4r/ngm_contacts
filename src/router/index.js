import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import AcademicPage from "../views/AcademicPage";
import NonAcademicPage from "../views/NonAcademicPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage
  },
  {
    path: "/home",
    name: "Home Page",
    component: HomePage
  },
  {
    path: "/academic",
    name: "Academic Page",
    component: AcademicPage
  },
  {
    path: "/non-academic",
    name: "Non Academic Page",
    component: NonAcademicPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("userEmail")) {
    if (!to.path.includes("/login")) {
      next("/login");
    }
  } else {
    next();
  }
  if (to.path == "" || to.path == "/") {
    next("/login");
  } else {
    next();
  }
});

export default router;

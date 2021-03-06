import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage";
import ForgotPage from "../views/ForgotPage";
import HomePage from "../views/HomePage";
import AcademicPage from "../views/AcademicPage";
import NonAcademicPage from "../views/NonAcademicPage";
import EditProfilePage from "../views/EditProfilePage";
import DynamicSubDepartment from "@/components/reusable/DynamicSubDepartment";
import ListUsers from "@/components/reusable/ListUsers";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage
  },
  {
    path: "/forgot",
    name: "Forgot Page",
    component: ForgotPage
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
  },
  {
    path: "/edit-profile",
    name: "Edit Profile Page",
    component: EditProfilePage
  },
  {
    path: "/dynamic-sub-dept/:mainDept/:subDept",
    name: "Dynamic Sub Department",
    component: DynamicSubDepartment
  },
  {
    path: "/list-users/:mainDept/:subDept/:dept",
    name: "Dynamic List Users",
    component: ListUsers
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("userEmail")) {
    if (to.path.includes("/login") || to.path.includes("/forgot")) {
      next();
    } else {
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

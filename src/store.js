import Vue from "vue";
import Vuex from "vuex";
import toaster from "./modules/toaster";
import auth from "./modules/auth";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    toaster,
    auth,
    users
  }
});

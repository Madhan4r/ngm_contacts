import Vue from "vue";
import Vuex from "vuex";
import toaster from "./modules/toaster";
import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    toaster,
    login
  }
});

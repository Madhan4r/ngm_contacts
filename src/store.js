import Vue from "vue";
import Vuex from "vuex";
import toaster from "./modules/toaster";
import auth from "./modules/auth";
import users from "./modules/users";
import departments from "./modules/departments";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    randomColor: [
      "grey",
      "red",
      "blueviolet",
      "darkgrey",
      "#ffd54f",
      "deeppink",
      "brown",
      "darkviolet"
    ]
  },
  mutations: {
    ["SET_LOADER"](state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    showLoader({ commit }) {
      commit("SET_LOADER", true);
    },
    hideLoader({ commit }) {
      commit("SET_LOADER", false);
    }
  },
  getters: {
    isLoading: state => state.isLoading,
    getRandomColor: state =>
      state.randomColor[Math.floor(Math.random() * state.randomColor.length)]
  },
  modules: {
    toaster,
    auth,
    users,
    departments
  }
});

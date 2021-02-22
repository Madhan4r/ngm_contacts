import { createUUID } from "./helpers";

const state = {
  toasters: [],
  fixedToaster: { show: false }
};

// create getters for all state variables
const getters = {
  getToasters: state => state.toasters,
  getFixedToasters: state => state.fixedToaster
};

// actions
const actions = {
  clearAllToast({ commit }) {
    commit("UPDATE_TOASTER", []);
  },
  showToast({ commit, dispatch }, payload) {
    let id = createUUID();
    payload["id"] = id;
    let autohide = payload["autohide"] || 5000;
    if (!payload["class"]) {
      payload["class"] = "bg-info text-white";
    }
    if (!payload["message"]) {
      payload["message"] = "Please add Message!";
    }
    commit("SET_TOASTER", payload);

    setTimeout(() => {
      dispatch("removeToastBasedOnId", id);
    }, autohide);
  },
  removeToastBasedOnId({ commit, getters }, removeId) {
    let { getToasters } = getters;
    commit(
      "UPDATE_TOASTER",
      getToasters.filter(val => val.id != removeId)
    );
  },

  showFixedToast({ commit }, payload) {
    let id = createUUID();
    payload["id"] = id;
    if (!payload["class"]) {
      payload["class"] = "bg-info text-white";
    }
    if (!payload["message"]) {
      payload["message"] = "Please add Message!";
    }
    commit("SHOW_FIXED_TOASTER", payload);
  },

  hideFixedToast({ commit }) {
    commit("HIDE_FIXED_TOASTER");
  }
};

// mutations
const mutations = {
  ["SET_TOASTER"](state, payload) {
    state.toasters = state.toasters.concat(payload);
  },
  ["UPDATE_TOASTER"](state, toaster) {
    state.toasters = toaster;
  },
  ["SHOW_FIXED_TOASTER"](state, payload) {
    state.fixedToaster = { show: true, ...payload };
  },
  ["HIDE_FIXED_TOASTER"](state) {
    state.fixedToaster = { show: false };
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

import firebase from "firebase/app";

const state = {
  userDetails: []
};
const getters = {};
const actions = {
  login({ state }, payload) {
    localStorage.removeItem("userData");
    console.log(state.userDetails, payload);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          console.log(user);
        },
        error => {
          alert(error.message);
        }
      );
  }
};
const mutations = {};

export default {
  state,
  getters,
  mutations,
  actions
};

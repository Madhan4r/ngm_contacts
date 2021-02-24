import firebase from "firebase/app";
import router from "../router";

const state = {
  userEmail: ""
};

const getters = {
  getUserEmail: state => state.userEmail
};

const actions = {
  login({ dispatch, commit }, payload) {
    localStorage.removeItem("userEmail");
    dispatch("showToast", {
      class: "bg-success text-white",
      message: "Loading...",
      autoHide: 3000
    });
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        res => {
          let { user } = res;
          localStorage.setItem("userEmail", user.email);
          commit("SET_USER_EMAIL", user.email);
          dispatch("showToast", {
            class: "bg-success text-white",
            message: "Login Successful!"
          });
          router.push("/home");
          dispatch("initialFetchAfterLogin");
          return res;
        },
        err => {
          dispatch("showToast", {
            class: "bg-danger text-white",
            message: "Invalid Credentials / Not a member!"
          });
          console.log(err.message);
        }
      );
  },
  logout({ dispatch, commit }) {
    localStorage.removeItem("userEmail");
    router.push("/login");
    dispatch("showToast", {
      class: "bg-success text-white",
      message: "Logged Out"
    });
    commit("SET_USER_EMAIL", "");
  },
  initialFetchAfterLogin({ dispatch, getters }) {
    let { getUserByEmail, getUserEmail } = getters;
    let appendAction = [];
    appendAction = [...appendAction, dispatch("getAllDatabase")];
    return Promise.all(appendAction).then(res => {
      console.log(getUserByEmail(getUserEmail));
      return res;
    });
  }
};

const mutations = {
  ["SET_USER_EMAIL"](state, payload) {
    state.userEmail = payload;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

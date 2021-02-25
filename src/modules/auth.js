import firebase from "firebase/app";
import router from "../router";

const state = {
  userEmail: JSON.parse(localStorage.getItem("userEmail")) || "",
  userData: []
};

const getters = {
  getUserEmail: state => state.userEmail,
  getUserData: state => state.userData
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
          localStorage.setItem("userEmail", JSON.stringify(user.email));
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
    localStorage.removeItem("departments");
    localStorage.removeItem("users");
    router.push("/login");
    dispatch("showToast", {
      class: "bg-success text-white",
      message: "Logged Out"
    });
    commit("SET_USER_EMAIL", "");
    commit("RESET_USER_DATA");
    commit("RESET_NON_ACADEMIC_DEPARTMENTS");
    commit("RESET_ACADEMIC_DEPARTMENTS");
    commit("RESET_USERS");
  },
  resetPassword({ dispatch }, email) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch("showToast", {
          class: "bg-success text-white",
          message: "Mail Sent! Please check your mail!"
        });
        router.push("/login");
      })
      .catch(err => {
        dispatch("showToast", {
          class: "bg-danger text-white",
          message: "No User Found!"
        });
        console.log("error while reseting password", err);
      })
      .finally(res => {
        return res;
      });
  },
  initialFetchAfterLogin({ dispatch, getters, commit }) {
    let { getUserByEmail, getUserEmail } = getters;
    let appendAction = [];
    appendAction = [...appendAction, dispatch("getAllDatabase")];
    return Promise.all(appendAction).then(res => {
      let userData = getUserByEmail(getUserEmail);
      commit("SET_USER_DATA", userData?.length ? userData[0] : []);
      return res;
    });
  },
  initialOfflineMode({ getters, commit, dispatch }) {
    let { getUserByEmail, getUserEmail } = getters;
    let userData = getUserByEmail(getUserEmail);
    if (userData?.length) {
      commit("SET_USER_DATA", userData[0]);
      dispatch("initialFetchAfterLogin");
    }
  }
};

const mutations = {
  ["SET_USER_EMAIL"](state, payload) {
    state.userEmail = payload;
  },
  ["SET_USER_DATA"](state, payload) {
    state.userData = payload;
  },
  ["RESET_USER_DATA"](state) {
    state.userData = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

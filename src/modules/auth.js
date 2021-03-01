import firebase from "firebase/app";
import router from "../router";

const state = {
  userEmail: JSON.parse(localStorage.getItem("userEmail")) || "",
  userData: []
};

const getters = {
  getUserEmail: state => state.userEmail,
  getUserData: state => state.userData,
  getScreen() {
    return screen;
  },
  isAdmin: state => {
    return state.userData?.role == "admin" ? true : false;
  }
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
  changePassword({ getters, dispatch }, payload) {
    const { getUserEmail } = getters;
    firebase.auth().signOut();
    return firebase
      .auth()
      .signInWithEmailAndPassword(getUserEmail, payload.oldPwd)
      .then(() => {
        let user = firebase.auth().currentUser;
        return user
          .updatePassword(payload.newPwd)
          .then(() => {
            dispatch("showToast", {
              class: "bg-success text-white",
              message: "Password changes successfully!"
            });
            return true;
          })
          .catch(err => {
            dispatch("showToast", {
              class: "bg-danger text-white",
              message: "Error whole updating!"
            });
            console.log(err);
            return false;
          });
      })
      .catch(err => {
        dispatch("showToast", {
          class: "bg-danger text-white",
          message: "Your old password was incorrect!"
        });
        console.log(err);
        return false;
      });
  },
  initialFetchAfterLogin({ dispatch, getters, commit }) {
    let { getUserByEmail, getUserEmail } = getters;
    if (getUserEmail) {
      let appendAction = [];
      appendAction = [...appendAction, dispatch("getAllDatabase")];
      return Promise.all(appendAction).then(res => {
        let userData = getUserByEmail(getUserEmail);
        commit("SET_USER_DATA", userData?.length ? userData[0] : []);
        return res;
      });
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

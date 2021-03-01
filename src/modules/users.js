import firebase from "firebase/app";

const state = {
  users: []
};

const getters = {
  getUsers: state => state.users,
  getUserByEmail: state => email => {
    return state.users?.length
      ? state.users.filter(val => {
          return val.email == email;
        })
      : [];
  },
  getPrincipal: state => {
    return state.users?.length
      ? state.users.filter(val => {
          return val.staff_role == "principal";
        })
      : [];
  }
};

const actions = {
  getAllDatabase({ dispatch }) {
    let appendAction = [];
    dispatch("showLoader");
    appendAction = [...appendAction, dispatch("getAllUsers")];
    appendAction = [...appendAction, dispatch("getAcademicDept")];
    appendAction = [...appendAction, dispatch("getNonAcademicDept")];
    return Promise.all(appendAction).then(res => {
      dispatch("hideLoader");
      return res;
    });
  },
  getAllUsers({ commit }) {
    const db = firebase.firestore();
    return db
      .collection("users")
      .get()
      .then(res => {
        let data = [];
        res.forEach(doc => {
          let temp = { ...doc.data(), id: doc.id };
          data.push(temp);
        });
        commit("SET_USERS", data);
      })
      .catch(err => {
        console.log("error while fetching users", err);
        commit("RESET_USERS");
      })
      .finally(res => {
        return res;
      });
  },
  updateUser({ dispatch }, data) {
    const db = firebase.firestore();
    let { payload, id } = data;
    return db
      .collection("users")
      .doc(id)
      .update(payload)
      .then(() => {
        dispatch("showToast", {
          class: "bg-success text-white",
          message: "Profile updated!"
        });
        dispatch("updateUsersData");
        return true;
      })
      .catch(error => {
        dispatch("showToast", {
          class: "bg-danger text-white",
          message: "error while updating profile!"
        });
        console.error("Error updating profile", error);
        return error;
      });
  },
  updateUsersData({ commit, getters, dispatch }) {
    let { getUserByEmail, getUserEmail } = getters;
    let appendAction = [];
    appendAction.push(dispatch("getAllUsers"));
    Promise.all(appendAction).then(() => {
      let userData = getUserByEmail(getUserEmail);
      if (userData?.length) {
        commit("SET_USER_DATA", userData[0]);
      }
    });
  }
};
const mutations = {
  ["SET_USERS"](state, payload) {
    state.users = payload;
  },
  ["RESET_USERS"](state) {
    state.users = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

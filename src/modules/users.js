import firebase from "firebase/app";

const state = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  academic: JSON.parse(localStorage.getItem("users"))?.academic || [],
  non_academic: JSON.parse(localStorage.getItem("users"))?.non_academic || []
};

const getters = {
  getUsers: state => state.users,
  getAcademicDept: state => state.academic,
  getNonAcademicDept: state => state.non_academic,
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
    appendAction = [...appendAction, dispatch("getAllUsers")];
    appendAction = [...appendAction, dispatch("getAcademicDept")];
    appendAction = [...appendAction, dispatch("getNonAcademicDept")];
    return Promise.all(appendAction).then(res => {
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
        localStorage.setItem("users", JSON.stringify(data));
      })
      .catch(err => {
        console.log("error while fetching users", err);
        commit("RESET_USERS");
      })
      .finally(res => {
        return res;
      });
  },
  getAcademicDept({ commit }) {
    const db = firebase.firestore();
    return db
      .collection("academic")
      .get()
      .then(res => {
        let data = [];
        res.forEach(doc => {
          let temp = { ...doc.data(), id: doc.id };
          data.push(temp);
        });
        commit("SET_ACADEMIC_DEPARTMENTS", data);
      })
      .catch(err => {
        console.log("error while fetching academic departments", err);
        commit("RESET_ACADEMIC_DEPARTMENTS");
      })
      .finally(res => {
        return res;
      });
  },
  getNonAcademicDept({ commit }) {
    const db = firebase.firestore();
    return db
      .collection("non_academic")
      .get()
      .then(res => {
        let data = [];
        res.forEach(doc => {
          let temp = { ...doc.data(), id: doc.id };
          data.push(temp);
        });
        commit("SET_NON_ACADEMIC_DEPARTMENTS", data);
      })
      .catch(err => {
        console.log("error while fetching non academic departments", err);
        commit("RESET_NON_ACADEMIC_DEPARTMENTS");
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
  },
  ["SET_ACADEMIC_DEPARTMENTS"](state, payload) {
    state.academic = payload;
    localStorage.setItem(
      "departments",
      JSON.stringify({ academic: payload, non_academic: state.non_academic })
    );
  },
  ["RESET_ACADEMIC_DEPARTMENTS"](state) {
    state.academic = [];
  },
  ["SET_NON_ACADEMIC_DEPARTMENTS"](state, payload) {
    state.academic = payload;
    localStorage.setItem(
      "departments",
      JSON.stringify({ non_academic: payload, academic: state.academic })
    );
  },
  ["RESET_NON_ACADEMIC_DEPARTMENTS"](state) {
    state.academic = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

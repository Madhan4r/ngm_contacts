import firebase from "firebase/app";

const state = {
  users: [],
  academic: [],
  non_academic: []
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
        const data = [];
        res.forEach(doc => {
          data.push({ [doc.id]: doc.data() });
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
  getAcademicDept({ commit }) {
    const db = firebase.firestore();
    return db
      .collection("academic")
      .get()
      .then(res => {
        const data = [];
        res.forEach(doc => {
          data.push({ [doc.id]: doc.data() });
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
        const data = [];
        res.forEach(doc => {
          data.push({ [doc.id]: doc.data() });
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
  },
  ["RESET_ACADEMIC_DEPARTMENTS"](state) {
    state.academic = [];
  },
  ["SET_NON_ACADEMIC_DEPARTMENTS"](state, payload) {
    state.academic = payload;
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

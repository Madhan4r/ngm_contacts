import firebase from "firebase/app";

const state = {
  academic: [],
  non_academic: []
};

const getters = {
  getAcademicDept: state => state.academic,
  getNonAcademicDept: state => state.non_academic
};

const actions = {
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
  createDepartment({ dispatch }, payload) {
    const db = firebase.firestore();
    let { collection, doc_id } = payload;
    let data = {};
    return db
      .collection(collection)
      .doc(doc_id)
      .set(data)
      .then(res => {
        dispatch("showToast", {
          class: "bg-success text-white",
          message: "Department Created!"
        });
        dispatch("getAcademicDept");
        dispatch("getNonAcademicDept");
        return res;
      })
      .catch(err => {
        dispatch("showToast", {
          class: "bg-danger text-white",
          message: "Error while creating!"
        });
        return err;
      });
  }
};
const mutations = {
  ["SET_ACADEMIC_DEPARTMENTS"](state, payload) {
    state.academic = payload;
  },
  ["RESET_ACADEMIC_DEPARTMENTS"](state) {
    state.academic = [];
  },
  ["SET_NON_ACADEMIC_DEPARTMENTS"](state, payload) {
    state.non_academic = payload;
  },
  ["RESET_NON_ACADEMIC_DEPARTMENTS"](state) {
    state.non_academic = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

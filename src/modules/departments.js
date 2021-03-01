import firebase from "firebase/app";

const state = {
  academic: [],
  non_academic: [],
  subDepartment: []
};

const getters = {
  getAcademicDept: state => state.academic,
  getNonAcademicDept: state => state.non_academic,
  getSubDepartment: state => state.subDepartment
};

const actions = {
  fetchAcademicDept({ commit }) {
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
  fetchNonAcademicDept({ commit }) {
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
  fetchSubDepartment({ commit, dispatch }, collection) {
    dispatch("showLoader");
    commit("RESET_SUB_DYNAMIC_DEPARTMENTS");
    const db = firebase.firestore();
    return db
      .collection(collection)
      .get()
      .then(res => {
        let data = [];
        res.forEach(doc => {
          let temp = { ...doc.data(), id: doc.id };
          data.push(temp);
        });
        commit("SET_SUB_DYNAMIC_DEPARTMENTS", data);
      })
      .catch(err => {
        console.log("error while fetching sub departments", err);
      })
      .finally(res => {
        dispatch("hideLoader");
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
        dispatch("fetchAcademicDept");
        dispatch("fetchNonAcademicDept");
        return res;
      })
      .catch(err => {
        dispatch("showToast", {
          class: "bg-danger text-white",
          message: "Error while creating!"
        });
        return err;
      });
  },
  createSubDepartment({ dispatch }, payload) {
    const db = firebase.firestore();
    let { mainCollection, doc_id, dept_name } = payload;
    let data = {
      Department_name: dept_name.toUpperCase().replaceAll(" ", "_")
    };
    return db
      .collection(mainCollection)
      .doc(doc_id)
      .collection(doc_id)
      .doc(dept_name)
      .set(data)
      .then(res => {
        dispatch("showToast", {
          class: "bg-success text-white",
          message: "Department Created!"
        });
        dispatch("fetchSubDepartment", `${mainCollection}/${doc_id}/${doc_id}`);
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
  },
  ["SET_SUB_DYNAMIC_DEPARTMENTS"](state, payload) {
    state.subDepartment = payload;
  },
  ["RESET_SUB_DYNAMIC_DEPARTMENTS"](state) {
    state.subDepartment = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

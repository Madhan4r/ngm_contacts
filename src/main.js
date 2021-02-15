import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CoreuiVue from '@coreui/vue';

Vue.use(CoreuiVue);
Vue.config.productionTip = false;

/* Import the firebase SDK and extend with firestore */
import firebase from 'firebase';
require('firebase/firestore');

/* Paste your firebase configuration below */
var firebaseConfig = {
  apiKey: "AIzaSyCtra2tVzotOYVKcZQQHR3AiXtAfrmZnnE",
  authDomain: "c-app-9ce0e.firebaseapp.com",
  databaseURL: "https://c-app-9ce0e-default-rtdb.firebaseio.com",
  projectId: "c-app-9ce0e",
  storageBucket: "c-app-9ce0e.appspot.com",
  messagingSenderId: "656441449816",
  appId: "1:656441449816:web:3e816fe6339d11ff4f592d",
  measurementId: "G-KEPXL7QTT2"
};

/* Initialize firebase with your configuration */
firebase.initializeApp(firebaseConfig);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

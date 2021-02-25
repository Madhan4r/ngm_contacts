import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

library.add(fas);
Vue.component("fas-icon", FontAwesomeIcon);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.use(CoreuiVue);
Vue.config.productionTip = false;

/* Import the firebase SDK and extend with firestore */
import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/auth");

/* Paste your firebase configuration below */
var firebaseConfig = {
  apiKey: "AIzaSyAMcpIR1eQbARWzLQvwZKH77wLwNJOZf0M",
  authDomain: "ngm4contacts.firebaseapp.com",
  databaseURL: "https://ngm4contacts-default-rtdb.firebaseio.com",
  projectId: "ngm4contacts",
  storageBucket: "ngm4contacts.appspot.com",
  messagingSenderId: "786370858500",
  appId: "1:786370858500:web:6f11b10c9530db21d26f51"
};

/* Initialize firebase with your configuration */
firebase.initializeApp(firebaseConfig);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;

extend("required", {
  validate(value) {
    let isValid;
    if (Array.isArray(value)) {
      isValid = value.length > 0;
    } else {
      isValid = ["", null, undefined].indexOf(value) === -1;
    }
    return {
      required: true,
      valid: isValid
    };
  },
  message: "This field is required",
  computesRequired: true
});

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount("#app");

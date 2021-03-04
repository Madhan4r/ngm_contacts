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
import moment from "moment";
import vSelect from "vue-select";

library.add(fas);
Vue.component("fas-icon", FontAwesomeIcon);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("v-select", vSelect);
Vue.use(CoreuiVue);
Vue.config.productionTip = false;

/* Import the firebase SDK and extend with firestore */
import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/auth");

/* Paste your firebase configuration below */
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".firebaseapp.com",
  databaseURL:
    "https://" +
    process.env.VUE_APP_FIREBASE_PROJECT_ID +
    "-default-rtdb.firebaseio.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".appspot.com"
};

/* Initialize firebase with your configuration */
firebase.initializeApp(firebaseConfig);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;
Vue.prototype.$moment = moment;

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

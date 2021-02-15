import firebase from "firebase";

// Your web app's Firebase configuration
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

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
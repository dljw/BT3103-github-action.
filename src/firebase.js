import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBF1W7l72BFtdsTEEqHokKAdtNmUvVysBw",
    authDomain: "bt3103-week-6-17db6.firebaseapp.com",
    projectId: "bt3103-week-6-17db6",
    storageBucket: "bt3103-week-6-17db6.appspot.com",
    messagingSenderId: "228939766270",
    appId: "1:228939766270:web:19e2f1105331527b7548af",
    measurementId: "G-HM6D0ZBL20"
};
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;

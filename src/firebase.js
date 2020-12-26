import firebase from "firebase"



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAjs-Q-ww0NTGjmEnQ4dN17shHn-T8s-bY",
    authDomain: "reservation-app-7f1cc.firebaseapp.com",
    projectId: "reservation-app-7f1cc",
    storageBucket: "reservation-app-7f1cc.appspot.com",
    messagingSenderId: "731984517228",
    appId: "1:731984517228:web:aa20a831d3631c36ea2049"
  });

  const db = firebaseApp.firestore();

  export default db;

  
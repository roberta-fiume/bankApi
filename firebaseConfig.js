 const firebase = require('firebase');
 
 var firebaseConfig = {
    apiKey: "AIzaSyBUOj8L5q-1fu8fTDnydjxYEggXDcrppIw",
    authDomain: "apicreation-260015.firebaseapp.com",
    databaseURL: "https://apicreation-260015.firebaseio.com",
    projectId: "apicreation-260015",
    storageBucket: "apicreation-260015.appspot.com",
    messagingSenderId: "22113597513",
    appId: "1:22113597513:web:8403c7d09d30fa73106798"
  };
  
  firebase.initializeApp(firebaseConfig);

  exports.firestore = firebase.firestore();
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyB3nixKFzRqdPj883w_aBOpisJbYIw5xiw",
  authDomain: "wsawebshare.firebaseapp.com",
  databaseURL: "https://wsawebshare.firebaseio.com",
  projectId: "wsawebshare",
  storageBucket: "wsawebshare.appspot.com",
  messagingSenderId: "400213427432",
  appId: "1:400213427432:web:01c47331016db44e19f55d",
  measurementId: "G-5CNH99T4RK"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

export { db };

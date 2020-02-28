import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
// import * as admin from 'firebase-admin';

// Initialize Firebase
const config = {
  // Your web app's Firebase configuration
  apiKey: "AIzaSyCbvPGqnV8rE5OJuHeAi4-oFhL8RJQ2oEc",
  authDomain: "iglesia-elim-db.firebaseapp.com",
  databaseURL: "https://iglesia-elim-db.firebaseio.com",
  projectId: "iglesia-elim-db",
  storageBucket: "iglesia-elim-db.appspot.com",
  messagingSenderId: "299275738665",
  appId: "1:299275738665:web:8eafc1c0835c08b9d90638"
};
firebase.initializeApp(config);

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iglesia-elim-db.firebaseio.com"
});
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: "https://iglesia-elim-db.firebaseio.com"
// });

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const auth = firebase.auth();
const database = firebase.database();
const fbConfig = firebase;

export {
  fbConfig,
  admin,
  auth,
  database,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};

import firebase from "firebase";

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

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// const githubAuthProvider = new firebase.auth.GithubAuthProvider();
// const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const auth = firebase.auth();
const database = firebase.database();

export {
  firebase,
  auth,
  database
  // googleAuthProvider,
  // githubAuthProvider,
  // facebookAuthProvider,
  // twitterAuthProvider
};

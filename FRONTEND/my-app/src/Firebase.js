import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCcF5qvHgJJSddX9b1iV-J-vsnuFkc8YhQ",
  authDomain: "imessage-clone-60028.firebaseapp.com",
  projectId: "imessage-clone-60028",
  storageBucket: "imessage-clone-60028.appspot.com",
  messagingSenderId: "857061839877",
  appId: "1:857061839877:web:9e643870c4d96895a3f86c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

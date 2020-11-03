import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./firebase.frontend.json";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
//  auth.getRedirectResult();

export default firebase;

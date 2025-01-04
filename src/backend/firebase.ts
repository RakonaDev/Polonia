// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsSjJykSje1_lUSSd_tk6KJCqwHggfuY0",
  authDomain: "polonia-test.firebaseapp.com",
  projectId: "polonia-test",
  storageBucket: "polonia-test.firebasestorage.app",
  messagingSenderId: "462945753090",
  appId: "1:462945753090:web:90cf86056819e3b661af1b",
};


// Initialize Firebase
export const FireBaseApp : FirebaseApp = initializeApp(firebaseConfig);
export const PoloniaDB: Firestore = getFirestore(FireBaseApp)
export const authFireBase: Auth = getAuth(FireBaseApp)

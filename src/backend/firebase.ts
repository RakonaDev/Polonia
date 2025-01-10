// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { config } from "dotenv"

config()

const {
  NEXT_PUBLIC_FIRE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
} = process.env

console.log(NEXT_PUBLIC_FIRE_API_KEY)

const firebaseConfig = {
  apiKey: "" + NEXT_PUBLIC_FIRE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_ID as string,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID as string,
};


// Initialize Firebase
export const FireBaseApp : FirebaseApp = initializeApp(firebaseConfig);
export const PoloniaDB: Firestore = getFirestore(FireBaseApp)
export const authFireBase: Auth = getAuth(FireBaseApp)

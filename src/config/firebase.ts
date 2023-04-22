import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE__API__KEY,
  authDomain: process.env.FIREBASE__DOMAIN,
  projectId: process.env.FIREBASE__PROJECT__ID,
  storageBucket: process.env.FIREBASE__BUCKET,
  messagingSenderId: process.env.FIREBASE__SENDER__ID,
  appId: process.env.FIREBASE__APP__ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app)
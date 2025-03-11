import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2-8Fz4r-pwwZxGtiAG1KVMru-sCqI-Xc",
    authDomain: "netflixclone-5b5b5.firebaseapp.com",
    projectId: "netflixclone-5b5b5",
    storageBucket: "netflixclone-5b5b5.firebasestorage.app",
    messagingSenderId: "112757658665",
    appId: "1:112757658665:web:3bc53f8ed99d599589f838",
  };

  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
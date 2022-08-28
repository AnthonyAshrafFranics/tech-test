// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE8EdUyndNOBtawWU14gSxPUc_4qCd2bQ",
  authDomain: "tech-test-9cd5e.firebaseapp.com",
  projectId: "tech-test-9cd5e",
  storageBucket: "tech-test-9cd5e.appspot.com",
  messagingSenderId: "1058854524049",
  appId: "1:1058854524049:web:a90a78f2a4c3c822675b30",
  measurementId: "G-YTRRX1NPY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, db };

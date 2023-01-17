// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPFkpoRORH0nXnklB8zwhPuANIgODgLEE",
  authDomain: "caplight-18de7.firebaseapp.com",
  projectId: "caplight-18de7",
  storageBucket: "caplight-18de7.appspot.com",
  messagingSenderId: "743370331690",
  appId: "1:743370331690:web:35ba1522b4e7db31f41553",
  measurementId: "G-Q280CD69DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
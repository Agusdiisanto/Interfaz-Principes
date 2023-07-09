import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtNJFPcT05blodynWCZhZWmWlB1mdRaFw",
    authDomain: "principesdeepersia.firebaseapp.com",
    projectId: "principesdeepersia",
    storageBucket: "principesdeepersia.appspot.com",
    messagingSenderId: "634155459620",
    appId: "1:634155459620:web:f032ced4ad06ac47e564b1",
    measurementId: "G-WQTGKEE75Q"
};
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
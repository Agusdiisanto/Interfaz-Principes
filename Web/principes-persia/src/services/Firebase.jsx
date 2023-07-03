import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../utils/FirebaseJson/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Firebase = getFirestore(app);

export default Firebase;

import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../utils/FirebaseJson/Firebase.json';

firebase.initializeApp(firebaseConfig);

export default firebase;

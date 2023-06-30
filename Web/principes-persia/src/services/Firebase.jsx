import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../utils/FirebaseJson/Firebase.json';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

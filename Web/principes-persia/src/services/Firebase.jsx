
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import firebaseConfig from '../utils/FirebaseJson/ConfigFire.json';

const firebaseApp = initializeApp(firebaseConfig);
const firebase = getDatabase(firebaseApp);

export default firebase;
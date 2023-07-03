import {getDocs, collection} from 'firebase/firestore';
import {db} from "../../utils/FirebaseJson/configFirebase"

// Todas las ubicacione de Firebase
export async function obtenerUbicaciones() {
    const data = await getDocs(collection(db, "ubicacion"));
    const dataList = data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return dataList;
}
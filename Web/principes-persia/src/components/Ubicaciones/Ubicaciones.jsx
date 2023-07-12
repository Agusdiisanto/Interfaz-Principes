import { useState, useEffect } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../utils/FirebaseJson/configFirebase';

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'ubicacion'), (snapshot) => {
      const ubicacionesData = snapshot.docs.map((doc) => doc.data());
      setUbicaciones(ubicacionesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Ubicaciones</h1>
      <ul>
        {ubicaciones.map((ubicacion, index) => (
          <li key={index}>
            Nombre: {ubicacion.nombre} | Estado de Alerta: {ubicacion.alerta}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Ubicaciones;
import { useEffect, useState } from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import { db } from "../../utils/FirebaseJson/configFirebase";

const Notificaciones = ({ ubicacionId }) => {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "ubicacion", ubicacionId);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setMensaje(snapshot.data());
      });
      // Cuando se desmonte el componente, se cancela la suscripción
      return () => {
        unsubscribe();
      };
    };
  
    fetchData();
  }, [ubicacionId]);

  return (
    <div className="notificaciones-container">
      <h1 className="notificaciones-title">Notificaciones</h1>
      <div>
        <h2>{mensaje.nombre}</h2>
        <h3>{mensaje.alerta}</h3>
        <h3>{mensaje.cantidadVectores}</h3>
      </div>
    </div>
  );
};

export default Notificaciones;

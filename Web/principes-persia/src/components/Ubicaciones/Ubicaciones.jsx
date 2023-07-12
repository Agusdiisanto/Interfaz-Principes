import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import Ubicacion from './Ubicacion';
import "./Ubicacion.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const db = getFirestore(); // Obtén una referencia a Firestore

  useEffect(() => {
    const ubicacionesRef = collection(db, 'ubicacion');

    const unsubscribe = onSnapshot(ubicacionesRef, (snapshot) => {
      const ubicacionesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUbicaciones(ubicacionesData);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cancela la suscripción cuando el componente se desmonta
  }, [db]); 
  
  return (
    <div className="ubicaciones">
      {isLoading ? (<Loader />) : (
        <>
          <h1 className="animate__animated animate__pulse title-container">Ubicaciones</h1>
          <div className="ubicaciones-list-container">
            <div className="ubicaciones-list">
              <div className="ubicaciones-list-header">
                <div className='ubicacion-estado'>Estado</div>
                <p>Nombre</p>
                <p>Latitud</p>
                <p>Longtitud</p>
              </div>  
              <div className="ubicaciones-list-elems">
                {ubicaciones &&
                  ubicaciones.map((ubicacion) => (
                    <Ubicacion key={ubicacion.id} ubicacion={ubicacion} />
                  ))}
              </div>
            </div>
          </div>
          <GoBack />
        </>
      )}
    </div>
  );
};

export default Ubicaciones;

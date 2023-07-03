import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import Firebase from "../../services/Firebase"
import "./Subscribe.css";
import GoBack from '../../utils/GoBack';

const Subscribe = () => {
  const [ubicacion, setUbicacion] = useState('');
  const [suscripcion, setSuscripcion] = useState(false);
  const estadoAnteriorRef = useRef('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let unsubscribe;

    if (suscripcion && ubicacion.trim() !== '') {
      const ubicacionRef = doc(Firebase, 'ubicacion', ubicacion);
      console.log("UbicacionRef", ubicacionRef);

      // No entra en el if por ende nunca notifica 
      // El problema debe ser que nunca se esta conectando a la base de datos de firebase

      unsubscribe = onSnapshot(ubicacionRef, (snapshot) => {
        if (snapshot.exists()) {
          const nuevaUbicacion = snapshot.data();
          console.log("Esta es la nueva ubicacion", nuevaUbicacion);
          const nombreUbicacion = nuevaUbicacion.nombre;
          estadoAnteriorRef.current = nombreUbicacion; // Actualizar el valor anterior
          if (nombreUbicacion !== estadoAnteriorRef.current) {
            setMensaje(`Notificación: La ubicación ha cambiado de ${estadoAnteriorRef.current} a ${nombreUbicacion}`);
          }
        }
      });

      console.log('Suscripción activada');
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [suscripcion, ubicacion]);

  const handleUbicacionChange = (event) => {
    setUbicacion(event.target.value);
  };

  const handleSuscripcion = () => {
    if (ubicacion.trim() !== '') {
      setSuscripcion(true);
      setMensaje(`Suscripción realizada para la ubicación "${ubicacion}"`);
    } else {
      setMensaje('Error: Ingresa una ubicación válida');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSuscripcion();
  };

  return (
    <div>
      <div className="container-suscripcion">
        <h1 className='title'>Suscripción</h1>
        <form className="ubicacion-form" onSubmit={handleFormSubmit}>
          <label className='ubicacion-nombre'>
            Ubicación:
            <input type="text" value={ubicacion} onChange={handleUbicacionChange} />
          </label>
          <button className="button-suscribirse" type="submit">
            Suscribirse
          </button>
        </form>
      </div>
      {
        mensaje && (<h1>{mensaje}</h1>)
      }
      <GoBack/>
    </div>
  );
};

export default Subscribe;

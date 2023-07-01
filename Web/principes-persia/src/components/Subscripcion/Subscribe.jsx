import { useState } from 'react';
import Firebase from '../../services/Firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const Subscribe = () => {
  const [ubicacion, setUbicacion] = useState('');
  const [suscripcion, setSuscripcion] = useState(false);

  const handleUbicacionChange = (event) => {
    setUbicacion(event.target.value);
  };

  const handleSuscripcionToggle = () => {
    if (suscripcion) {
      // Cancelar suscripción
      setSuscripcion(false);
    } else {
      // Suscribirse
      const unsubscribe = onSnapshot(doc(collection(Firebase, 'ubicaciones'), ubicacion), (snapshot) => {
        if (snapshot.exists()) {
          // Objeto de ubicación existe
          console.log('Notificación: El objeto de ubicación ha cambiado');
        }
      });
      setSuscripcion(true);
      // Puedes almacenar el resultado de la suscripción si necesitas cancelarla más tarde
      // unsubscribe();
    }
  };

  return (
    <div>
      <h1>Subscripción</h1>
      <form>
        <label>
          Ubicación:
          <input type="text" value={ubicacion} onChange={handleUbicacionChange} />
        </label>
        <button type="button" onClick={handleSuscripcionToggle}>
          {suscripcion ? 'Cancelar Suscripción' : 'Suscribirse'}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;

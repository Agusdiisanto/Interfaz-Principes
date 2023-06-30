import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import configFire from "../../utils/FirebaseJson/firebaseConfig";

// Inicializa la app de Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(configFire);
}

const Notificaciones = () => {
  const [consoleMessages, setConsoleMessages] = useState([]);

  useEffect(() => {
    // Obtiene la referencia a la ubicación en Firebase Realtime Database donde se almacenan los datos
    const dbRef = firebase.database().ref('ubicacion');

    // Manejador de evento para cuando se actualizan los datos en Firebase Realtime Database
    const handleValueChange = (snapshot) => {
      const data = snapshot.val();
      const message = JSON.stringify(data);

      setConsoleMessages((prevMessages) => [...prevMessages, message]);
    };

    // Escucha los cambios en la referencia
    dbRef.on('value', handleValueChange);

    // Desactiva el listener cuando el componente se desmonta
    return () => {
      dbRef.off('value', handleValueChange);
    };
  }, []);

  return (
    <div className="notificaciones-container">
      <h1 className="notificaciones-title">Notificaciones</h1>
      {consoleMessages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default Notificaciones;

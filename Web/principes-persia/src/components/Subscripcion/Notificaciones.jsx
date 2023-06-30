
import { useEffect, useState } from 'react';
import firebase from "../../services/firebase";

const Notificaciones = () => {
  const [consoleMessages, setConsoleMessages] = useState([]);

  useEffect(() => {
    // Establece la referencia a la ubicación en Firebase Realtime Database donde se almacenan los datos
    const dbRef = firebase.ref('ubicacion');

    // Manejador de evento para cuando se actualizan los datos en Firebase Realtime Database
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const message = JSON.stringify(data);

      setConsoleMessages((prevMessages) => [...prevMessages, message]);
    });

    // Desactiva el listener cuando el componente se desmonta
    return () => {
      dbRef.off('value');
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

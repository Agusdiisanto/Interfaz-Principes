import { createContext, useState, useEffect } from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import { db } from "../utils/FirebaseJson/configFirebase";
import PropTypes from 'prop-types';
export const UbicacionContext = createContext();

export const UbicacionProvider = ({ children }) => {
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      if (ubicacionSeleccionada) {
        const docRef = doc(db, 'ubicacion', ubicacionSeleccionada);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          // Actualizar el estado ubicacionSeleccionada
          setMensaje(snapshot.data());
        });

        return () => {
          unsubscribe();
        };
      }
    };

    fetchData();
  }, [ubicacionSeleccionada]);

  return (
    <UbicacionContext.Provider value={{ ubicacionSeleccionada, setUbicacionSeleccionada,mensaje}}>
      {children}
    </UbicacionContext.Provider>
  );
};


UbicacionProvider.propTypes = {
    children: PropTypes.node.isRequired
};
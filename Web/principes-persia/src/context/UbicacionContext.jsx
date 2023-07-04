import { createContext, useState, useEffect } from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import { db } from "../utils/FirebaseJson/configFirebase";
import PropTypes from 'prop-types';

export const UbicacionContext = createContext();

export const UbicacionProvider = ({ children }) => {
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [conteo, setConteo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (ubicacionSeleccionada) {
        const docRef = doc(db, 'ubicacion', ubicacionSeleccionada);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          const datosActuales = snapshot.data();
          setMensaje(datosActuales);
          if (mensaje && datosActuales.cantidadVectores !== mensaje.cantidadVectores) {
            setConteo(conteo + 1);
          }
        });
        return () => {
          unsubscribe();
        };
      } else {
        setMensaje("");
        setUbicacionSeleccionada(null)
        setConteo(0)
      }
    };

    fetchData();
  }, [ubicacionSeleccionada, mensaje && mensaje.cantidadVectores]);

  return (
    <UbicacionContext.Provider value={{ ubicacionSeleccionada, setUbicacionSeleccionada, mensaje, conteo}}>
      {children}
    </UbicacionContext.Provider>
  );
};

UbicacionProvider.propTypes = {
  children: PropTypes.node.isRequired
};

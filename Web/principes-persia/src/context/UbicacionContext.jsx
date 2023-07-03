import { createContext, useState } from 'react';

export const UbicacionContext = createContext();

export const UbicacionProvider = ({ children }) => {
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);

  return (
    <UbicacionContext.Provider value={{ ubicacionSeleccionada, setUbicacionSeleccionada }}>
      {children}
    </UbicacionContext.Provider>
  );
};

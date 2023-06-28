import { useState, useEffect } from 'react';
import { obtenerUbicaciones } from '../services/Api';
import Ubicacion from '../components/Ubicacion';

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState(null); // Cambio en el estado inicial

  const getUbicaciones = () => {
    obtenerUbicaciones()
      .then((response) => {
        setUbicaciones(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
      });
  };

  useEffect(() => {
    getUbicaciones();
  }, []);

  console.log(ubicaciones);

  return (
    <div>
      <h1>Ubicaciones</h1>
      <div>
        {ubicaciones && ubicaciones.map((ubicacion) => <Ubicacion key={ubicacion.nombre} ubicacion={ubicacion} />)}
      </div>
    </div>
  );
};

export default Ubicaciones;

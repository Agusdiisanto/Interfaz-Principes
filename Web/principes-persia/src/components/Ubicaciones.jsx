import { useState, useEffect } from 'react';
import { obtenerUbicaciones } from '../services/Api';
import Ubicacion from '../components/Ubicacion';
import "./Ubicacion.css"
import GoBack from '../utils/GoBack';

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState(null); // Cambio en el estado inicial

  const getUbicaciones = () => {
    obtenerUbicaciones()
      .then((response) => {
        console.log(response)
        setUbicaciones(response);
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
    <div className="ubicaciones-container">
      <h1 className='title-container'>Ubicaciones:</h1>
      <div className="ubicaciones-list">
        {ubicaciones &&
          ubicaciones.map((ubicacion) => (
            <Ubicacion key={ubicacion.nombreDeLaUbicacion} ubicacion={ubicacion} />
          ))}
      </div>
      <GoBack/>
    </div>
  );
};

export default Ubicaciones;

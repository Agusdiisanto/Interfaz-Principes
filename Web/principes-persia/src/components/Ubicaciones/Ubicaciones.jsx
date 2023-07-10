import { useState, useEffect } from 'react';
import { obtenerUbicaciones } from '../../services/Api';
import Ubicacion from './Ubicacion';
import "./Ubicacion.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  const getUbicaciones = () => {
    obtenerUbicaciones()
      .then((response) => {
        setUbicaciones(response);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
      });
  };

  useEffect(() => {
    getUbicaciones();
  }, []);

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
                    <Ubicacion key={ubicacion.nombreDeLaUbicacion} ubicacion={ubicacion} />
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

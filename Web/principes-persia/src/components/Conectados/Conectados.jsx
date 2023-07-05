import { useState, useEffect } from 'react';
import { obtenerConectados } from '../../services/Api';
import Ubicacion from '../Ubicaciones/Ubicacion';
import "../Ubicaciones/Ubicacion.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';
import Searcher from './Searcher';


const Conectados = () => {
  const [ubicaciones, setUbicaciones] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [alerta, setAlerta] = useState(null);
  const NO_CONECTADOS_MESSAGE = 'No hay conectados con esa ubicación';


  const getConectados = () => {
    obtenerConectados(searchQuery)
      .then((response) => {
        setUbicaciones(response);
        setIsLoading(false); 
        checkAlerta(response);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
      });
  };    

  useEffect(() => {
    getConectados();
  }, [searchQuery]);


  const checkAlerta = (ubicaciones) => {
    const alertaRoja = ubicaciones.some((ubicacion) => ubicacion.alerta === 'rojo');
    const alertaAmarilla = ubicaciones.some((ubicacion) => ubicacion.alerta === 'amarillo');

    if (alertaRoja) {
      setAlerta('¡Alerta Roja! Peligro');
    } else if (alertaAmarilla) {
      setAlerta('¡Alerta Amarilla! Cautela');
    } else {
      setAlerta(null);
    }
  };

  return (
    <div className="ubicaciones-container">
      {isLoading && (
        <Loader />
        )} 
          <h1 className="animate__animated animate__pulse title-container">Conectados:</h1>
          <Searcher setQuery={setSearchQuery} />
          {ubicaciones && ubicaciones.length > 0 ? (
            <div className="ubicaciones-list">
                {ubicaciones.map((ubicacion) => (
                <Ubicacion key={ubicacion.nombreDeLaUbicacion} ubicacion={ubicacion} />
                ))}
            </div>
            ) : searchQuery !== null && <h1 className='sub-title'>{NO_CONECTADOS_MESSAGE}</h1>}

          <GoBack />
        
    </div>
  );
};

export default Conectados;

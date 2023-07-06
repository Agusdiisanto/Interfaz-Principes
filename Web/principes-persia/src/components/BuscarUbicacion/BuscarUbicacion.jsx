import { useState, useEffect } from 'react';
import { recuperarUbicacion } from '../../services/Api';
import Ubicacion from '../Ubicaciones/Ubicacion';
import "../Ubicaciones/Ubicacion.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';
import Searcher from '../Conectados/Searcher';

const BuscarUbicacion = () => {
  const [ubicacion, setUbicacion] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const getUbicacion = () => {
    if (searchQuery !== null) {
      recuperarUbicacion(searchQuery)
        .then((response) => {
          setUbicacion(response);
          setIsLoading(false); 
        })
        .catch((error) => {
          console.error('Error al obtener las ubicaciones:', error);
        });
    }
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getUbicacion();
    }
  }, [searchQuery]);



  return (
    <div className="ubicaciones-container">
      {isLoading && (
        <Loader />
        )} 
        <h1 className="animate__animated animate__pulse title-container">Buscar Ubicacion:</h1>
        <Searcher setQuery={setSearchQuery} />
        {ubicacion !== null && <Ubicacion ubicacion={ubicacion}/>}

        <GoBack />
        
    </div>
  );
};

export default BuscarUbicacion;

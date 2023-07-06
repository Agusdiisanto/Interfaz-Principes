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
  const [error, setError] = useState("")

  const getUbicacion = () => {
    if (searchQuery !== null) {
      recuperarUbicacion(searchQuery)
        .then((response) => {
          setUbicacion(response);
          setIsLoading(false); 
          setError("")
        })
        .catch((error) => {
          setUbicacion(null)
          setError('No se ha encontrado esa ubicacion', error);
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
        <Searcher setQuery={setSearchQuery} />
        {ubicacion !== null && <Ubicacion ubicacion={ubicacion}/>}
        {error && <h2 className='error-mensaje'>{error}</h2>}
        <GoBack />
        
    </div>
  );
};

export default BuscarUbicacion;

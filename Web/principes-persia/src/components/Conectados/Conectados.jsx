import { useState, useEffect, useContext} from 'react';
import { obtenerConectados } from '../../services/Api';
import Ubicacion from '../Ubicaciones/Ubicacion';
import "../Ubicaciones/Ubicacion.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';
import Searcher from './Searcher';
import Modal from '../../utils/Modal/Modal';
import Notificacion from '../Subscripcion/Notificacion';
import { UbicacionContext } from '../../context/UbicacionContext';

const Conectados = () => {
  const { mensaje,setConteo} = useContext(UbicacionContext);
  const [ubicaciones, setUbicaciones] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [alerta, setAlerta] = useState(null);
  const [showModal, setShowModal] = useState(false)
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
  }, [ubicaciones,searchQuery]);


  const checkAlerta = (ubicaciones) => {
    const alertaRoja = ubicaciones.some((ubicacion) => ubicacion.alerta === 'Rojo');
    const alertaAmarilla = ubicaciones.some((ubicacion) => ubicacion.alerta === 'Amarillo');

    if (alertaRoja) {
      setAlerta('Rojo');
    } else if (alertaAmarilla) {
      setAlerta('Amarillo');
    } else {
      setAlerta(null);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setConteo(0)
  }

  return (
    <div className="ubicaciones-container">
      {showModal ? (<Modal onCloseModal = {() => setShowModal(false)} notificacion={alerta}/>) : null }
      {isLoading && (
        <Loader />
        )} 

      {alerta && mensaje.nombre === searchQuery ? (
        <Notificacion openModal = {handleOpenModal}/>
        ) : null}

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

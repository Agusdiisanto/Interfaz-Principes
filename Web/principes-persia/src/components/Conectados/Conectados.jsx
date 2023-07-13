import { useState, useEffect, useContext } from 'react';
import { obtenerConectados } from '../../services/Api';
import Ubicacion from '../Ubicaciones/Ubicacion';
import "./Conectados.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';
import Searcher from './Searcher';
import Modal from '../../utils/Modal/Modal';
import Notificacion from '../Subscripcion/Notificacion';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { UbicacionContext } from '../../context/UbicacionContext';

const Conectados = () => {
  const { mensaje, setConteo } = useContext(UbicacionContext);
  const [ubicacionesAPI, setUbicacionesAPI] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const NO_CONECTADOS_MESSAGE = 'No hay conectados con esa ubicación';
  const db = getFirestore();

  const getConectados = () => {
    setIsLoading(true);
    setErrorMessage(null);

    obtenerConectados(searchQuery)
      .then((response) => {
        if (response.length === 0) {
          setErrorMessage('No hay resultados');
        } else {
          setUbicacionesAPI(response);
        }
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
        setErrorMessage('Error al obtener las ubicaciones');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchQuery) {
      getConectados();
    } else {
      setUbicacionesAPI([]);
      setIsLoading(false);
      setErrorMessage(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    const obtenerUbicacionesFirestore = async () => {
      if (ubicacionesAPI.length > 0) {
        const ubicacionesRef = collection(db, 'ubicacion');
        const ubicacionesQuery = query(ubicacionesRef, where('nombre', 'in', ubicacionesAPI.map(obj => obj.nombreDeLaUbicacion)));

        const unsubscribe = onSnapshot(ubicacionesQuery, (snapshot) => {
          const ubicacionesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUbicaciones(ubicacionesData);
          setIsLoading(false);
        });

        return () => unsubscribe();
      } else {
        setIsLoading(false);
      }
    };

    obtenerUbicacionesFirestore();
  }, [db, ubicacionesAPI]);

  useEffect(() => {
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

    checkAlerta(ubicaciones);
  }, [ubicaciones]);

  const handleOpenModal = () => {
    setShowModal(true);
    setConteo(0);
  };

  return (
    <div className="conectados-container">
      {showModal && <Modal onCloseModal={() => setShowModal(false)} notificacion={alerta} />}
      {alerta && mensaje.nombre === searchQuery && <Notificacion openModal={handleOpenModal} />}
      <h1 className="animate__animated animate__pulse title-container">Conectados:</h1>
      <Searcher setQuery={setSearchQuery} />
      <div className="loader-container">
        {isLoading && <Loader />}
      </div>
      {errorMessage ? (
        <h1 className='sub-title'>{errorMessage}</h1>
      ) : ubicaciones.length > 0 ? (
        <div className="conectados-list">
          {ubicaciones.map((ubicacion) => (
            <Ubicacion key={ubicacion.nombre} ubicacion={ubicacion} conectados={true} />
          ))}
        </div>
      ) : (
        searchQuery !== null && <h1 className='sub-title'>{NO_CONECTADOS_MESSAGE}</h1>
      )}
      <div>
        <GoBack />
      </div>
    </div>
  );
};

export default Conectados;

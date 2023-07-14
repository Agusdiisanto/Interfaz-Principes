import { useState, useEffect, useContext } from 'react';
import { obtenerConectados } from '../../services/Api';
import Ubicacion from '../Ubicaciones/Ubicacion';
import "./Conectados.css"
import GoBack from '../../utils/GoBack';
import Loader from '../../utils/Loader/Loader';
import Searcher from './Searcher';
import Modal from '../../utils/Modal/Modal';
import Notificacion from '../Subscripcion/Notificacion';
import { getFirestore, collection, onSnapshot, query, where,getDocs } from 'firebase/firestore';
import { UbicacionContext } from '../../context/UbicacionContext';

const Conectados = () => {
  const { mensaje, setConteo } = useContext(UbicacionContext);
  const [ubicacionesAPI, setUbicacionesAPI] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alerta, setAlerta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const NO_CONECTADOS_MESSAGE = 'No hay conectados con esa ubicación';
  const db = getFirestore();

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
    const checkAlerta = async () => {
      const ubicacionesRef = collection(db, 'ubicacion');
      const alertaQuery = query(ubicacionesRef, where('alerta', 'in', ['Rojo', 'Amarillo']));
  
      const snapshot = await getDocs(alertaQuery);
      const tieneAlerta = !snapshot.empty;
  
      if (tieneAlerta) {
        setAlerta(snapshot.docs[0].data().alerta);
      } else {
        setAlerta(null);
      }
    };
  
    checkAlerta();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setConteo(0);
  };

  const getConectados = () => {
    obtenerConectados(searchQuery)
      .then((response) => {
        setUbicacionesAPI(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
      });
  };

  useEffect(() => {
    getConectados();
  }, [searchQuery]);

  return (
    <div className="conectados-container">
      {showModal && <Modal onCloseModal={() => setShowModal(false)} notificacion={alerta} />}
      {isLoading && <Loader />}
      {alerta && mensaje.nombre === searchQuery && <Notificacion openModal={handleOpenModal} />}

      <h1 className="animate__animated animate__pulse title-container">Conectados:</h1>
      <Searcher setQuery={setSearchQuery} />
      {ubicaciones.length > 0 ? (
        <div className="conectados-list">
          {ubicaciones.map((ubicacion) => (
            <Ubicacion key={ubicacion.nombre} ubicacion={ubicacion} conectados={true} />
          ))}
        </div>
      ) : searchQuery !== null && <h1 className='sub-title'>{NO_CONECTADOS_MESSAGE}</h1>}
      <div>
        <GoBack />
      </div>
    </div>
  );
};

export default Conectados;

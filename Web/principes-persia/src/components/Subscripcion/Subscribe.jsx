import { useState, useEffect, useContext} from 'react';
import { Link } from 'react-scroll';
import './Subscribe.css';
import GoBack from '../../utils/GoBack';
import { obtenerUbicaciones } from '../../utils/FirebaseJson/fireUbicaciones';
import { UbicacionContext } from '../../context/UbicacionContext';
import Estado from './Estado';

const Subscribe = () => {
  const [ubicacion, setUbicacion] = useState('');
  const { ubicacionSeleccionada, setUbicacionSeleccionada} = useContext(UbicacionContext);

  useEffect(() => {
    obtenerUbicaciones()
      .then((dataList) => {
        setUbicacion(dataList);
      })
      .catch((error) => {
        console.log('Error al obtener ubicaciones:', error);
      });
  }, []);


  const handleSubscribe = (id) => {
    setUbicacionSeleccionada((prevSeleccionada) => {
      if (prevSeleccionada === id) {
        return null;
      }
      return id;
    });
  };

  return (
    <div className='subscribe-container'>
      <h1 className='subscribe-title'>¡Suscríbete y recibe notificaciones!</h1>
      <div className='subscribe-list-container '>
        <div className='subscribe-list '>
          {ubicacion &&
            ubicacion.map((ubicacionItem) => (
              <div key={ubicacionItem.id} className={`subscribe-item ${ubicacionSeleccionada === ubicacionItem.id ? 'selected' : ''}`}>
                <Link
                  to={ubicacionItem.id.toString()}
                  spy={true}
                  smooth={true}
                  duration={500}
                  className='subscribe-link'
                >
                  <h2>{ubicacionItem.nombre}</h2>
                </Link>
                <button
                  className={`subscribe-button ${ubicacionSeleccionada === ubicacionItem.id ? 'unsubscribe' : 'subscribe'}`}
                  onClick={() => handleSubscribe(ubicacionItem.id)}
                >
                  {ubicacionSeleccionada === ubicacionItem.id ? 'Desuscribir' : 'Suscribir'}
                </button>
              </div>
            ))}
        </div>
      </div>
      {ubicacionSeleccionada && <Estado/>}
      <GoBack />
    </div>
  );
};

export default Subscribe;

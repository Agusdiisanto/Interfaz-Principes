import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-scroll';
import './Subscribe.css';
import GoBack from '../../utils/GoBack';
import { obtenerUbicaciones } from '../../utils/FirebaseJson/fireUbicaciones';
import { UbicacionContext } from '../../context/UbicacionContext';
import Estado from './Estado';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Subscribe = () => {
  const [ubicacion, setUbicacion] = useState([]);
  const { ubicacionSeleccionada, setUbicacionSeleccionada } = useContext(UbicacionContext);
  const ubicacionesPorLista = 5; // Cambiar el número de ubicaciones por lista según tus necesidades

  useEffect(() => {
    obtenerUbicaciones()
      .then((data) => {
        setUbicacion(data);
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

  const renderUbicaciones = () => {
    const ubicacionesListas = [];
    const totalUbicaciones = ubicacion.length;
    let i = 0;

    while (i < totalUbicaciones) {
      const listaUbicaciones = ubicacion.slice(i, i + ubicacionesPorLista);
      ubicacionesListas.push(
        <div className='subscribe-list' key={i}>
          {listaUbicaciones.map((ubicacionItem) => (
            <div
              key={ubicacionItem.id}
              className={`subscribe-item ${ubicacionSeleccionada === ubicacionItem.id ? 'selected' : ''}`}
            >
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
      );
      i += ubicacionesPorLista;
    }

    return ubicacionesListas;
  };

  return (
    <div className='subscribe-container'>
      <h1 className='title-container'>¡Suscríbete y recibe notificaciones!</h1>
      <div className='subscribe-scroll-container'>
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          selectedItem={ubicacionSeleccionada}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type='button' onClick={onClickHandler} title={label} className='carousel-arrow carousel-arrow-prev'>
                <span className='carousel-arrow-icon'>&#8249;</span>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type='button' onClick={onClickHandler} title={label} className='carousel-arrow carousel-arrow-next'>
                <span className='carousel-arrow-icon'>&#8250;</span>
              </button>
            )
          }
        >
          {renderUbicaciones()}
        </Carousel>
      </div>
      {ubicacionSeleccionada && <Estado />}
      <GoBack />
    </div>
  );
};

export default Subscribe;

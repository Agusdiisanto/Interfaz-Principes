import { useState, useEffect, useContext } from 'react';
import "./Subscribe.css";
import GoBack from '../../utils/GoBack';
import { obtenerUbicaciones } from "../../utils/FirebaseJson/fireUbicaciones"
import { UbicacionContext } from '../../context/UbicacionContext';
import Notificaciones from './Notificaciones';


const Subscribe = () => {
  const [ubicacion, setUbicacion] = useState('');
  const { ubicacionSeleccionada, setUbicacionSeleccionada } = useContext(UbicacionContext);

  useEffect(() => {
    obtenerUbicaciones()
      .then((dataList) => {
        setUbicacion(dataList);
      })
      .catch((error) => {
        console.log("Error al obtener ubicaciones:", error);
      });
  }, []);

  const handleSubscribe = (id) => {
    setUbicacionSeleccionada((prevSeleccionada) => {
      // Si la ubicación ya está seleccionada, se desubcribe
      if (prevSeleccionada === id) {
        return null;
      }
      // Si la ubicación no está seleccionada, se Subscribe
      return id;
    });
  }

  return (
    <div className='ubicaciones-container'>
      <h1 className='title'>Subscribite a una Ubicacion</h1>
      <h3 className='ubicacion-nombre'>Al subscribirte a una ubicacion recibiras notificaciones</h3>
      <div className='ubicaciones-list'>
      {ubicacion &&
        ubicacion.map((ubicacionItem) => (
          <div key={ubicacionItem.id} className='ubicacion-fire'>
            <h2>{ubicacionItem.nombre}</h2>
            <button className = {ubicacionSeleccionada === ubicacionItem.id ? 'desubscribirte' : 'susbscribirte'} onClick={() => handleSubscribe(ubicacionItem.id)}>
              {ubicacionSeleccionada === ubicacionItem.id ? 'Desubscribirte' : 'Subscribirte'}
            </button>
          </div>
        ))}
        <GoBack />
      </div>
      {ubicacionSeleccionada && <Notificaciones/>}
    </div>
  );
};

export default Subscribe;

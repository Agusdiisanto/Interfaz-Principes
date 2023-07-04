import { useContext } from 'react';
import { UbicacionContext } from '../../context/UbicacionContext';
import "./Estado.css"

const Estado = () => {
  const { mensaje } = useContext(UbicacionContext);
  return (
    <div className="notificaciones-container">
      <h1 className="notificaciones-title">Estado : </h1>
      <div className='notificacion-ubicacion'>
      <h2>{mensaje.nombre}, esta en alerta {mensaje.alerta} con {mensaje.cantidadVectores} vectores </h2>        
      </div>
    </div>
  );
};

export default Estado;
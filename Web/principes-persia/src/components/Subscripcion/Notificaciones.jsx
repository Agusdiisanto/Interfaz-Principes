import { useContext } from 'react';
import { UbicacionContext } from '../../context/UbicacionContext';
import "./Notificaciones.css"

const Notificaciones = () => {
  const { mensaje } = useContext(UbicacionContext);
  return (
    <div className="notificaciones-container">
      <h1 className="notificaciones-title">Notificaciones : </h1>
      <div className='notificacion-ubicacion'>
      <h2>{mensaje.nombre}, esta en alerta <span className={mensaje.alerta}>{mensaje.alerta}</span> con {mensaje.cantidadVectores} vectores </h2>        
      </div>
    </div>
  );
};

export default Notificaciones;
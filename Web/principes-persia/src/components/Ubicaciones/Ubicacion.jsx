import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Ubicacion = ({ ubicacion}) => {
  const opciones = ["Rojo", "Verde", "Amarillo"] 
  const [clase, setClase] = useState("");

  useEffect(() => {
    if (!opciones.includes(ubicacion.alerta)) {
      setClase("default");
    } else {
      setClase(ubicacion.alerta);
    }
  }, [ubicacion.alerta]);

  return (
    <div className={`ubicacion-card ${clase}`}>
      <h4 className='ubicacion-card-elem ubicacion-name'>{ubicacion.nombreDeLaUbicacion}</h4>
      <h6 className='ubicacion-card-elem'>{ubicacion.latitud}</h6>
      <h6 className='ubicacion-card-elem'>{ubicacion.longitud}</h6>
    </div>
  );
};

Ubicacion.propTypes = {
  ubicacion: PropTypes.shape({
    nombreDeLaUbicacion: PropTypes.string.isRequired,
    alerta: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired,
  }).isRequired,
};

export default Ubicacion;

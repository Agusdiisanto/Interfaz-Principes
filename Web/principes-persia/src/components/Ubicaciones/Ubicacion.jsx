import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Ubicacion = ({ ubicacion }) => {
  const opciones = ["Rojo", "Verde", "Amarillo"];
  const [clase, setClase] = useState("");

  useEffect(() => {
    if (!opciones.includes(ubicacion.alerta)) {
      setClase("default");
    } else {
      setClase(ubicacion.alerta);
    }
  }, [ubicacion.alerta]);

  return (
    <div className="ubicacion-card">
      <div className={`ubicacion-card-estado ${clase}`}></div>
      <p className="ubicacion-card-elem ubicacion-name">{ubicacion.nombreDeLaUbicacion}</p>
      <p className="ubicacion-card-elem">{ubicacion.latitud}</p>
      <p className="ubicacion-card-elem">{ubicacion.longitud}</p>
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

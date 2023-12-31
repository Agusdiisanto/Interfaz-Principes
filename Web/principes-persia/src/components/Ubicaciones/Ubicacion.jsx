import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Ubicacion = ({ ubicacion, conectados = false }) => {
  const opciones = ["Rojo", "Verde", "Amarillo"];
  const [clase, setClase] = useState("");

  useEffect(() => {
    if (!opciones.includes(ubicacion.alerta)) {
      setClase("default");
    } else {
      setClase(ubicacion.alerta);
    }
  }, [ubicacion.alerta]);

  const redondearCoordenadas = (coordenada) => {
    return coordenada.toFixed(2);
  };

  const latitudRedondeada = redondearCoordenadas(ubicacion.latitud);
  const longitudRedondeada = redondearCoordenadas(ubicacion.longitud);

  return (
    <div className="ubicacion-card">
      <div className={`ubicacion-card-estado ${clase}`}></div>
      <p className="ubicacion-card-elem ubicacion-name">{ubicacion.nombre}</p>
      <p className="ubicacion-card-elem">{latitudRedondeada}</p>
      <p className="ubicacion-card-elem">{longitudRedondeada}</p>
    </div>
  );
};

Ubicacion.propTypes = {
  ubicacion: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    alerta: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired,
  }).isRequired,
  conectados: PropTypes.bool.isRequired,
};

export default Ubicacion;

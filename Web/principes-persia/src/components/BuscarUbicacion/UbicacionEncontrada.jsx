import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./UbicacionEncontrada.css";

const UbicacionEncontrada = ({ ubicacion }) => {
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
    <div className={`ubicacion-box ${clase}`}>
      <p className="ubicacion-box-elem box-name">{ubicacion.nombreDeLaUbicacion}</p>
      <p className="ubicacion-box-elem">Latituld: {latitudRedondeada}</p>
      <p className="ubicacion-box-elem">Longitud: {longitudRedondeada}</p>
    </div>
  );
};

UbicacionEncontrada.propTypes = {
  ubicacion: PropTypes.shape({
    nombreDeLaUbicacion: PropTypes.string.isRequired,
    alerta: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired,
  }).isRequired,
};

export default UbicacionEncontrada;

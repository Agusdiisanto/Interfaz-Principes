import PropTypes from 'prop-types';

const Ubicacion = ({ ubicacion }) => {
  return (
    <div className="ubicacion-card">
      <div>
        <h4>{ubicacion.nombreDeLaUbicacion}</h4>
      </div>
      <h6>Latitud: {ubicacion.latitud}</h6>
      <h6>Longitud: {ubicacion.longitud}</h6>
    </div>
  );
};


Ubicacion.propTypes = {
  ubicacion: PropTypes.shape({
    nombreDeLaUbicacion: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired,
  }).isRequired,
};

export default Ubicacion
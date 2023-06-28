
const Ubicacion = ({ ubicacion }) => {

  return (
    <div className="ubicacion-card">
      <h4>{ubicacion.nombreDeLaUbicacion}</h4>
      <h6>Latitud: {ubicacion.latitud}</h6>
      <h6>Longitud: {ubicacion.longitud}</h6>
    </div>
  );
};

export default Ubicacion
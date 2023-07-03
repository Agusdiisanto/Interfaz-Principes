import { Options } from "../utils/Options";
import "./Home.css";
import MapToList from "../utils/MapToList/MapToList";
import { useContext } from 'react';
import { UbicacionContext } from '../context/UbicacionContext';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
  const { mensaje } = useContext(UbicacionContext);
  const numActualizaciones = mensaje ? mensaje.cantidadVectores : 0;

  return (
    <div className="home-container">
      {mensaje ? (
        <div className="bell-icon">
          <FontAwesomeIcon icon={faBell} color="black" />
          {numActualizaciones > 0 && <span className="contador">+{numActualizaciones}</span>}
        </div>
      ) : null}
      <h2 className="animate__animated animate__pulse title-container">Home</h2>
      <div className="option-container">
        <h3>Seleccione una opción:</h3>
        <div className="options-grid">
          <MapToList lista={Options} />
        </div>
      </div>
    </div>
  );
};

export default Home;

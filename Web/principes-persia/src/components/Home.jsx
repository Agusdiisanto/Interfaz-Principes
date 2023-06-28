import { Options } from '../utils/Options';
import "./Home.css"
import MapToList from '../utils/MapToList/MapToList';

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="title-container">Home</h2>
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
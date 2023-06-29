import { Options } from "../utils/Options";
import "./Home.css";
import MapToList from "../utils/MapToList/MapToList";
import ListaDeUbicaciones from "./ListaDeUbicaciones";
import Notificaciones from "./Notificaciones";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="title">Príncipes de EPERSia</h2>
      <h3 className="subtitle">Sistema de trackeo de ubicaciones</h3>
      <div className="body-container">
        <ListaDeUbicaciones/>
        <Notificaciones/>

        {/* <div className="options-grid">
          <MapToList lista={Options} />
        </div> */}
      </div>
    </div>
  );
};

export default Home;

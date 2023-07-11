import { Options } from "../utils/Options";
import "./Home.css";
import MapToList from "../utils/MapToList/MapToList";
import { useContext, useState } from 'react';
import { UbicacionContext } from '../context/UbicacionContext';
import Modal from "../utils/Modal/Modal"
import Notificacion from "../components/Subscripcion/Notificacion"

const Home = () => {
  const { mensaje, setConteo } = useContext(UbicacionContext);
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true);
    setConteo(0)
  }

  return (
    <div className="home-container">
      {showModal ? (<Modal onCloseModal = {() => setShowModal(false)}/>) : null }
      {mensaje ? (
        <Notificacion openModal = {handleOpenModal}/>
      ) : null}
      <h2 className="animate__animated animate__pulse title-container">Príncipes de EPERSia</h2>
      <div className="option-container">
        <h3>Sistema de suscripción a ubicaciones</h3>
        <div className="options-grid">
          <MapToList lista={Options} />
        </div>
      </div>
    </div>
  );
};

export default Home;

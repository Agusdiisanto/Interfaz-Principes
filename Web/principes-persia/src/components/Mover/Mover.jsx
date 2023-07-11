import { useState, useContext } from "react";
import GoBack from "../../utils/GoBack";
import { useForm } from "react-hook-form";
import { moverVector, moverMasCorto } from "../../services/Api";
import VectorImage from "./vector.webp";
import "./Mover.css";
import { UbicacionContext } from "../../context/UbicacionContext";
import Modal from "../../utils/Modal/Modal";
import Notificacion from "../../components/Subscripcion/Notificacion";
import Check from "../../img/check.png"


const Mover = () => {
  const { mensaje, setConteo } = useContext(UbicacionContext);
  const [error, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [nombreUbicacion, setNombreUbicacion] = useState("");
  const [isMoverMasCorto, setIsMoverMasCorto] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    setConteo(0);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { vectorId, ubicacionNombre } = data;
      setNombreUbicacion(ubicacionNombre);
      if (isMoverMasCorto) {
        try {
          await moverMasCorto(vectorId, ubicacionNombre);
          setShowCheck(true);
        } catch (error) {
          setErrorMessage(error.message);
          reset();
          return;
        }
      } else {
        try {
          await moverVector(vectorId, ubicacionNombre);
          setShowCheck(true);
        } catch (error) {
          setErrorMessage(error.message);
          reset();
          return;
        }
      }
      reset();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      reset();
    }
  };

  const handleCloseNotification = () => {
    setShowCheck(false);
  };

  return (
    <div className="main-container">
      <div className="bg-container">
      {showCheck && (
          <div className="notification-container">
            <img src={Check} alt="Check" />
            <p>El vector se ha movido correctamente</p>
            <button className="close-icon" onClick={handleCloseNotification}>
              X
            </button>
          </div>
        )}
        {showModal
          ? <Modal onCloseModal = {() => setShowModal(false)} llegoUnVector = {true} />
          : null
        }
        {mensaje && mensaje.nombre === nombreUbicacion
          ? <Notificacion openModal = {handleOpenModal}/>
          : null
        }
        <img className="mover-img" src={VectorImage} alt="vectores en movimiento" />
        <div className="form-container">
          <div className="form">
            <h2 className="form-title">Mover</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="form-label-container">
                  <label htmlFor="vectorId" className="form-label">
                    ID del vector
                  </label>
                  {errors.vectorId && (
                    <p className="error-message">Este campo es requerido</p>
                  )}
                </div>
                <input
                  type="text"
                  id="vectorId"
                  {...register("vectorId", { required: true })}
                  className={`form-input ${errors.vectorId ? "error" : ""}`}
                />
              </div>
              <div className="form-group">
                <div className="form-label-container">
                  <label htmlFor="nombre" className="form-label">
                    Nombre del destino
                  </label>
                  {errors.nombre && (
                    <p className="error-message">Este campo es requerido</p>
                  )}
                </div>
                <input
                  type="text"
                  id="ubicacionNombre"
                  {...register("ubicacionNombre", { required: true })}
                  className={`form-input ${errors.ubicacionNombre ? "error" : ""}`}
                />
              </div>
              <div className="form-group">
                <div className="form-label-container">
                  <label htmlFor="moverMasCorto" className="form-label">
                    Mover por el camino más corto
                  </label>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="moverMasCorto"
                      checked={isMoverMasCorto}
                      onChange={() => setIsMoverMasCorto(!isMoverMasCorto)}
                    />
                    <label htmlFor="moverMasCorto" className="checkbox-custom" />
                  </div>
                </div>
              </div>
              <div className="summit-container">
                <button type="submit" className="submit-button">Mover vector</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
      <GoBack />
    </div>
  );
};

export default Mover;

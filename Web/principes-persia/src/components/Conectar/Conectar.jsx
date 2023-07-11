import { conectarUbicaciones } from "../../services/Api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import GoBack from "../../utils/GoBack";
import "./Conectar.css";
import Check from "../../img/check.png"
import ConexionImg from "./conexion.webp"

const Conectar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [selectedValue, setSelectedValue] = useState("");
  const [showCheck, setShowCheck] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [error, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const conectarDTO = {
        ubicacionOrigen: data.nombreOrigen,
        ubicacionDestino: data.nombreDestino,
        tipoDeCamino: selectedValue
      };

      await conectarUbicaciones(conectarDTO);
      reset(); 
      setShowCheck(true)
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCloseNotification = () => {
    setShowCheck(false);
  };

  return (
    <div className="conectar-container">
      {showCheck && (
          <div className="notification-container">
            <img src={Check} alt="Check" />
            <p>El vector se ha movido correctamente</p>
            <button className="close-icon" onClick={handleCloseNotification}>
              X
            </button>
          </div>
        )}
      <h1 className="title-container">Conectar</h1>
      <body className="conectar-body">
        <img src={ConexionImg} alt="conexion"/>
        <form className="conectar-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-elem">
            <label htmlFor="nombreOrigen" className="form-label">
              Ubicación origen
            </label>
            {errors.nombreOrigen && (
              <p className="error-message">Este campo es requerido</p>
            )}
            <input
              type="text"
              id="nombreOrigen"
              {...register("nombreOrigen", { required: true })}
              className={`conectar-form-input ${errors.nombreOrigen ? "error" : ""}`}
            />
          </div>
          <div className="form-elem">
            <label htmlFor="nombreDestino" className="form-label">
              Ubicación destino
            </label>
            {errors.nombreDestino && (
              <p className="error-message">Este campo es requerido</p>
            )}
            <input
              type="text"
              id="nombreDestino"
              {...register("nombreDestino", { required: true })}
              className={`conectar-form-input ${errors.nombreDestino ? "error" : ""}`}
            />
          </div>
          <div className="form-elem">
            <label htmlFor="tipoCamino" className="form-label">
              Tipo de camino
            </label>
            {errors.tipoCamino && (
              <p className="error-message">Este campo es requerido</p>
            )}
            <select
              id="tipoCamino"
              value={selectedValue}
              onChange={handleSelectChange}
              className={`conectar-form-input ${errors.tipoCamino ? "error" : ""}`}
            >
              <option value="">Selecciona...</option>
              <option value="tierra">Tierra</option>
              <option value="mar">Mar</option>
              <option value="aire">Aire</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Conectar
          </button>
        </form>
      </body>
      {error && <h2 className="error-message">{error}</h2>}
      <GoBack />
    </div>
  );
};

export default Conectar;

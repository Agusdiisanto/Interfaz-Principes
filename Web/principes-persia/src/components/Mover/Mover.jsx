import { moverVector } from "../../services/Api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Mover.css";
import GoBack from "../../utils/GoBack";

const Mover = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setErrorMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      await moverVector(data);
      console.log("El vector se ha movido correctamente");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="bg-container">
        <img
          className="mover-img"
          src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KMLUD4LV6JEE3LQWOPCTRPT7ZA.jpg"
          alt="vectores en movimiento"
        />
        <div className="form-container">
          <div className="form">
            <h2 className="form-title">Mover vector</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="vectorID" className="form-label">ID del vector</label>
                <input
                  type="text"
                  id="vectorID"
                  {...register("vectorID", { required: true })}
                  className={`form-input ${errors.vectorID ? "error" : ""}`}
                />
                {errors.vectorID && (
                  <p className="error-message">Este campo es requerido</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre del destino</label>
                <input
                  type="text"
                  id="nombre"
                  {...register("nombre", { required: true })}
                  className={`form-input ${errors.nombre ? "error" : ""}`}
                />
                {errors.nombre && (
                  <p className="error-message">Este campo es requerido</p>
                )}
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

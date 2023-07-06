import { moverMasCorto } from "../../services/Api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./MoverMasCorto.css";
import GoBack from "../../utils/GoBack";

const MoverMasCorto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setErrorMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      await moverMasCorto(data);
      console.log("El vector se ha movido correctamente");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="bg-container">
        <img
          className="moverMasCorto-img"
          src="https://thumbs.dreamstime.com/b/un-animal-abstracto-que-encarna-el-concepto-de-velocidad-y-agilidad-ai-generativo-273299364.jpg"
          alt="vectores en movimiento"
        />
        <div className="form-container">
          <div className="form">
            <h2 className="form-title">Mover por el camino mas corto</h2>
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

export default MoverMasCorto;

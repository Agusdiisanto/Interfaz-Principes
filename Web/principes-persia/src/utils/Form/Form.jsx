import { useForm } from "react-hook-form";
import "./Form.css";
import GoBack from "../GoBack";

const Form = ({title, img, onSubmit, error}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="main-container">
      <div className="bg-container">
        <img
          className="mover-img"
          src={img}
          alt="vectores en movimiento"
        />
        <div className="form-container">
          <div className="form">
            <h2 className="form-title">{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="form-label-container">
                  <label htmlFor="vectorID" className="form-label">ID del vector</label>
                  {errors.vectorID && (
                    <p className="error-message">Este campo es requerido</p>
                  )}
                </div>
                <input
                  type="text"
                  id="vectorID"
                  {...register("vectorID", { required: true })}
                  className={`form-input ${errors.vectorID ? "error" : ""}`}
                />
              </div>
              <div className="form-group">
                <div className="form-label-container">
                  <label htmlFor="nombre" className="form-label">Nombre del destino</label>
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

export default Form;

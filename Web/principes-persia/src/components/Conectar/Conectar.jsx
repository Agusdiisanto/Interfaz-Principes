import { conectarUbicaciones } from "../../services/Api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import GoBack from "../../utils/GoBack";
import "./Conectar.css";

const Conectar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [error, setErrorMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      await conectarUbicaciones(data);
      console.log("Las ubicaciones se han conectado correctamente");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="conectar-container">
      <h1>Conectar</h1>
      <form className="conectar-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-elem">
          <div className="form-label-container">
            <label htmlFor="nombreOrigen" className="form-label">Ubicación origen</label>
            {errors.nombreOrigen && (<p className="error-message">Requerido</p>)}
          </div>
          <input
            type="text"
            id="nombreOrigen"
            {...register("nombreOrigen", { required: true })}
            className={`form-input ${errors.nombreOrigen ? "error" : ""}`}
          />
        </div>
        <div className="form-elem">
          <div className="form-label-container">
            <label htmlFor="nombreDestino" className="form-label">Ubicación destino</label>
            {errors.nombreDestino && (<p className="error-message">Requerido</p>)}
          </div>
          <input
            type="text"
            id="nombreDestino"
            {...register("nombreDestino", { required: true })}
            className={`form-input ${errors.nombreDestino ? "error" : ""}`}
          />
        </div>
        <div className="form-elem">
          <div className="form-label-container">
            <label htmlFor="tipoCamino" className="form-label">Tipo de camino</label>
            {errors.tipoCamino && (<p className="error-message">Requerido</p>)}
          </div>
          <select id="tipoCamino" value={selectedValue} onChange={handleSelectChange}>
            <option value="">Selecciona...</option>
            <option value="tierra">Tierra</option>
            <option value="mar">Mar</option>
            <option value="aire">Aire</option>
          </select>
        </div>
        <div className="summit-container">
          <button type="submit" className="submit-button">
            Conectar
          </button>
        </div>
      </form>
      <GoBack />
    </div>
  );
};

export default Conectar;

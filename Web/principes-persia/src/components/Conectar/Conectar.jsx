import { conectarUbicaciones, recuperarUbicacion } from "../../services/Api";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import GoBack from "../../utils/GoBack";
import "./Conectar.css";
import Check from "../../img/check.png";
import ConexionImg from "./conexion.webp";
import { UbicacionContext } from "../../context/UbicacionContext";
import Notificacion from "../Subscripcion/Notificacion";
import Modal from "../../utils/Modal/Modal";

const Conectar = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedValue, setSelectedValue] = useState("");
  const [showCheck, setShowCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const { mensaje } = useContext(UbicacionContext);
  const [error, setError] = useState("");
  const [ubicaciones, setUbicaciones] = useState({ ubicacionActual: "", ubicacionDestino: "" });

  useEffect(() => {
    if (mensaje?.nombre === ubicaciones.ubicacionActual) {
      recuperarUbicacion(ubicaciones.ubicacionDestino)
        .then((response) => {
          console.log(response)
          const ubicacion = response; // Asumiendo que response.data contiene la ubicación
          checkAlerta(ubicacion);
        })
        .catch((error) => {
          setError("No se ha encontrado esa ubicación");
        });
    }
  }, [mensaje, ubicaciones]);

  const checkAlerta = (ubicacion) => {
    if (ubicacion.alerta === "Rojo" || ubicacion.alerta === "Amarillo") {
      setAlerta(ubicacion.alerta);
    } else {
      setAlerta(null);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const conectarDTO = {
        ubicacionOrigen: data.nombreOrigen,
        ubicacionDestino: data.nombreDestino,
        tipoDeCamino: selectedValue,
      };
      setUbicaciones({ ubicacionActual: data.nombreOrigen, ubicacionDestino: data.nombreDestino });
      await conectarUbicaciones(conectarDTO);     
      reset();
      setShowCheck(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseNotification = () => {
    setShowCheck(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="conectar-container">
      {showModal && <Modal onCloseModal={() => setShowModal(false)} notificacion={alerta} />}
      {ubicaciones.ubicacionActual && mensaje?.nombre === ubicaciones.ubicacionActual && <Notificacion openModal={handleOpenModal} />}
      {showCheck && (
        <div className="notification-container">
          <img src={Check} alt="Check" />
          <p>Las ubicaciones se han conectado correctamente</p>
          <button className="close-icon" onClick={handleCloseNotification}>
            X
          </button>
        </div>
      )}
      <h1 className="title-container">Conectar</h1>
      <body className="conectar-body">
        <img src={ConexionImg} alt="conexion" />
        <form className="conectar-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-elem">
            <label htmlFor="nombreOrigen" className="form-label">
              Ubicación origen
            </label>
            {errors.nombreOrigen && <p className="error-message">Este campo es requerido</p>}
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
            {errors.nombreDestino && <p className="error-message">Este campo es requerido</p>}
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
            {errors.tipoCamino && <p className="error-message">Este campo es requerido</p>}
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

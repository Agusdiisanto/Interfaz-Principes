import { useState, useEffect, useContext } from "react";
import { recuperarUbicacion } from "../../services/Api";
import UbicacionEncontrada from "./UbicacionEncontrada";
import "./BuscarUbicacion.css";
import GoBack from "../../utils/GoBack";
import Loader from "../../utils/Loader/Loader";
import Searcher from "../Conectados/Searcher";
import { UbicacionContext } from "../../context/UbicacionContext";

const BuscarUbicacion = () => {
  const { mensaje } = useContext(UbicacionContext);
  const [ubicacion, setUbicacion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUbicacion = () => {
    if (searchQuery !== null) {
      setIsLoading(true);
      setError("");
      recuperarUbicacion(searchQuery)
        .then((response) => {
          console.log(response)
          setUbicacion(response);
        })
        .catch((error) => {
          setUbicacion(null);
          setError("No se ha encontrado esa ubicación");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (searchQuery !== null) {
      getUbicacion();
    }
  }, [searchQuery]);

  return (
    <div className="ubicaciones-container">
      {isLoading && <Loader />}
      <h2 className="animate__animated animate__pulse title-container">Buscar ubicación</h2>
      <div className="ubicaciones-body">
        <Searcher setQuery={setSearchQuery} />
        <div className="ubicacion-container">
          {ubicacion !== null && <UbicacionEncontrada ubicacion={ubicacion} />}
        </div>
        {mensaje && searchQuery === mensaje.nombre && (
          <h2 className={`mensaje-alerta mensaje-${mensaje.alerta}`}>
            {mensaje.alerta === "Rojo" &&
              "¡Ten mucho cuidado! Esta ubicación se encuentra en alerta roja."}
            {mensaje.alerta === "Amarillo" &&
              "¡Ten cuidado! Esta ubicación se encuentra en alerta amarilla."}
            {mensaje.alerta === "Verde" &&
              "Esta ubicación se encuentra en alerta verde. ¡Todo está bien!"}
          </h2>
        )}
        {error && <h2 className="error-mensaje">{error}</h2>}
        <GoBack />
      </div>
    </div>
  );
};

export default BuscarUbicacion;

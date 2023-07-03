import { useState, useEffect } from "react";
import { obtenerUbicaciones } from "../../services/Api";
import Ubicacion from "../components/Ubicacion";
import "./ListaDeUbicaciones.css";

const ListaDeUbicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState(null); // Cambio en el estado inicial

  const getUbicaciones = () => {
    obtenerUbicaciones()
      .then((response) => {
        console.log(response);
        setUbicaciones(response);
      })
      .catch((error) => {
        console.error("Error al obtener las ubicaciones:", error);
      });
  };

  useEffect(() => {
    getUbicaciones();
  }, []);

  return (
    <div className="list-container">
      <h1 className="list-title">Ubicaciones</h1>
      <div className="ubicaciones-list">
        {ubicaciones &&
          ubicaciones.map((ubicacion) => (
            <Ubicacion
              key={ubicacion.nombreDeLaUbicacion}
              ubicacion={ubicacion}
            />
          ))}
      </div>
    </div>
  );
};

export default ListaDeUbicaciones;

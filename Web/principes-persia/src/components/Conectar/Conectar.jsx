import { conectarUbicaciones } from "../../services/Api";
import { useState } from "react";


const Conectar = () => {
  const [error, setErrorMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      await conectarUbicaciones(data);
      console.log("Las ubicaciones se han conectado correctamente");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return ( // SUPONGO QUE SE PUEDE SACAR ESTE FORM Y USAR OTRO O BIEN HACERLE UN REFACTOR.
    <h1>Conectados</h1>
  );
};

export default Conectar;

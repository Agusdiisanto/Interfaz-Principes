import { conectarUbicaciones } from "../../services/Api";
import { useState } from "react";
import Form from "../../utils/Form/Form";

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
    <Form
      title="Conectar ubicaciones"
      img="https://thumbs.dreamstime.com/b/un-animal-abstracto-que-encarna-el-concepto-de-velocidad-y-agilidad-ai-generativo-273299364.jpg"
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default Conectar;

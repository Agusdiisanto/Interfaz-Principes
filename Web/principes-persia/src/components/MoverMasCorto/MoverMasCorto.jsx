import { moverMasCorto } from "../../services/Api";
import { useState } from "react";
import Form from "../../utils/Form/Form";

const MoverMasCorto = () => {
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
    <Form
      title="Mover por el camino mas corto"
      img="https://thumbs.dreamstime.com/b/un-animal-abstracto-que-encarna-el-concepto-de-velocidad-y-agilidad-ai-generativo-273299364.jpg"
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default MoverMasCorto;

import { moverVector } from "../../services/Api";
import { useState } from "react";
import Form from "../../utils/Form/Form";

const Mover = () => {
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
    <Form
      title="Mover vector"
      img="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KMLUD4LV6JEE3LQWOPCTRPT7ZA.jpg"
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default Mover;

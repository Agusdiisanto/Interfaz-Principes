import { useNavigate } from "react-router-dom";
import "./GoBack.css";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="goBackButton" onClick={() => navigate("/")}>
        Volver
      </button>
    </div>
  );
};

export default GoBack;

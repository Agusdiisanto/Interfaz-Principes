import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const navigate = useNavigate(); 
  return (
    <div>
        <button onClick={() => navigate("/")}>Volver</button>
    </div>
  )
}

export default GoBack
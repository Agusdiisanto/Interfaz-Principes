import { useNavigate } from 'react-router-dom';
import './MapToList.css';

const MapToList = ({ lista }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return lista.map((option) => (
    <div className="option-card" key={option.path} onClick={() => handleNavigation(option.path)}>
      <h3>{option.label}</h3>
      <p>{option.description}</p>
    </div>
  ));
};

export default MapToList;

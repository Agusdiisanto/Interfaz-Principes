import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MapToList.css';

const MapToList = ({ lista }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return lista.map((option) => (
    <div className={`option-card ${option.className}`} key={option.path} onClick={() => handleNavigation(option.path)}>
      <div className='option-icon'>
        <FontAwesomeIcon icon={option.icon} />
        <h3>{option.label}</h3> 
      </div>
      <p>{option.description}</p>
    </div>
  ));
};

export default MapToList;

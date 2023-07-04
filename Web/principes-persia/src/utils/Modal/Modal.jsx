import { useContext } from 'react';
import { UbicacionContext } from '../../context/UbicacionContext';
import "./Modal.css"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Modal = ({onCloseModal}) => {
  const { mensaje } = useContext(UbicacionContext);

  let titulo = "";

  if (mensaje.alerta === "Verde") {
    titulo = "Tu ciudad está tranquila, no hay peligro";
  } else if (mensaje.alerta === "Amarillo") {
    titulo = "Ten cuidado, hay bastantes vectores en tu ciudad";
  } else if (mensaje.alerta === "Rojo") {
    titulo = "PELIGRO: No salgas de tu casa, te puedes contagiar";
  } else {
  // Valor por defecto en caso de que mensaje.alerta no coincida con ninguna opción
    titulo = "Estado de alerta desconocido";
  }

  return (
    <div className='modal-overlay '>
      <div className={`modal-container`}></div>  
      <div className={`modal ${mensaje.alerta}`}>
      <div className='text-container'>
        <span className="close-icon" onClick={onCloseModal}>
                  <FontAwesomeIcon icon={faTimes} />
        </span>
          <h1>{titulo}</h1>
      </div>
   
      </div>
    </div>
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal
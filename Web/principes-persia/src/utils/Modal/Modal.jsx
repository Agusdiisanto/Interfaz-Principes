import { useContext } from 'react';
import { UbicacionContext } from '../../context/UbicacionContext';
import "./Modal.css"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Modal = ({onCloseModal, notificacion = ""}) => {
  const { mensaje } = useContext(UbicacionContext);

  let titulo = "";

  if (mensaje.alerta === "Verde") {
    titulo = "Tu ciudad está tranquila, no hay peligro";
  } else if (mensaje.alerta === "Amarillo") {
    titulo = "Ten cuidado, hay bastantes vectores en tu ciudad";
  } else if (mensaje.alerta === "Rojo") {
    titulo = "PELIGRO: No salgas de tu casa, te puedes contagiar";
  } 

  if(notificacion === "Rojo"){
    titulo = "Ten mucho cuidado, en una ciudad cercana hay muchos vectores y estan el alerta roja"
  }else if (notificacion === "Amarillo") {
    titulo = "Ten cautela, hay bastantes vectores en la ciudad cercana pero estan en alerta amarilla";
  }


  return (
    <div className='modal-overlay '>
      <div className={`modal-container`}></div>  
      <div className={`modal ${mensaje ? mensaje.alerta : ""} ${notificacion === "Rojo" ? "Rojo" : notificacion === "Amarillo" ? "Amarillo" : "" }`}>
      <div className='text-container'> 
        <span className="close-icon" onClick={onCloseModal}>
                  <FontAwesomeIcon icon={faTimes} />
        </span>
          <h1>
            {titulo}
          </h1>
      </div>
   
      </div>
    </div>
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  notificacion: PropTypes.string.isRequired
};

export default Modal
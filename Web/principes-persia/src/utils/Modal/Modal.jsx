import { useContext } from 'react';
import { UbicacionContext } from '../../context/UbicacionContext';
import "./Modal.css"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Modal = ({onCloseModal, notificacion = "" , llegoUnVector = false}) => {
  const { mensaje } = useContext(UbicacionContext);

  let titulo = "";

  if (mensaje.alerta === "Verde" && !llegoUnVector) {
    titulo = "Tu ciudad está tranquila, no hay peligro";
  } else if (mensaje.alerta === "Amarillo" && !llegoUnVector) {
    titulo = "Ten cuidado, hay bastantes vectores en tu ciudad";
  } else if (mensaje.alerta === "Rojo" && !llegoUnVector) {
    titulo = "PELIGRO: No salgas de tu casa, te puedes contagiar";
  } 

  if(notificacion === "Rojo" && !llegoUnVector){
    titulo = "Ten mucho cuidado, en una ciudad cercana hay muchos vectores y estan el alerta roja"
  }else if (notificacion === "Amarillo" && !llegoUnVector) {
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
          {llegoUnVector === true && mensaje.alerta === "Rojo" && (
            <>
              Llego un vector mas a tu ubicacion, estas en alerta Roja. Se recomienda quedarte en tu casa.{' '}
            </>
          )}
          {llegoUnVector === true && mensaje.alerta === "Amarillo" && (
            <>
              Llego un vector a tu ubicacion, estas en alerta Amarillo. Ten cuidado al salir.{' '}
            </>
          )}
          {llegoUnVector === true && mensaje.alerta === "Verde" && (
            <>
              Llego un vector a tu ubicacion, pero tranquilo,Que no hay peligro.{' '}
            </>
          )}
          {titulo}
        </h1>
      </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  notificacion: PropTypes.string.isRequired,
  llegoUnVector: PropTypes.bool.isRequired
};

export default Modal
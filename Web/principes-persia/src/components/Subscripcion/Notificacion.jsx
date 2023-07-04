import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Notificacion.css"
import PropTypes from 'prop-types';
import { UbicacionContext } from '../../context/UbicacionContext';
import {useContext} from 'react';

const Notificacion = ({setShowModal}) => {

  const {mensaje} = useContext(UbicacionContext);

  return (
    <div className="bell-icon" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faBell} color="black" />
        {mensaje.cantidadVectores > 0 && <span className="contador">+{mensaje.cantidadVectores}</span>}
    </div>
  )
}

Notificacion.propTypes = {
    actualizaciones: PropTypes.number.isRequired,
    setShowModal: PropTypes.func.isRequired,
};

export default Notificacion
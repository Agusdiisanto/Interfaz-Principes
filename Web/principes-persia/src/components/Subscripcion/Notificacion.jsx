import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Notificacion.css"
import PropTypes from 'prop-types';
import { UbicacionContext } from '../../context/UbicacionContext';
import {useContext} from 'react';

const Notificacion = ({openModal}) => {

  const {conteo} = useContext(UbicacionContext);
  
  return (
    <div className="bell-icon" onClick={() => openModal()}>
        <FontAwesomeIcon icon={faBell} color="black" />
        {conteo > 0 && <span className="contador">+{conteo}</span>}
    </div>
  )
}

Notificacion.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default Notificacion
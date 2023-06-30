import { crearUbicacion } from '../../services/Api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import "./Form.css"
import GoBack from '../../utils/GoBack';

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setErrorMessage] = useState("")
    const onSubmit = async (data) => {
      try {
        await crearUbicacion(data);
        console.log('La ubicación se ha creado correctamente');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    
  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-title">Crear Ubicación</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="nombreDeLaUbicacion" className="form-label">Nombre:</label>
            <input
              type="text"
              id="nombre"
              {...register('nombreDeLaUbicacion', { required: true })}
              className={`form-input ${errors.nombre ? 'error' : ''}`}
            />
            {errors.nombre && <p className="error-message">Este campo es requerido</p>}
          </div>
          <div className="form-group">
            <label htmlFor="latitud" className="form-label">Latitud:</label>
            <input
              type="text"
              id="latitud"
              {...register('latitud', { required: true })}
              className={`form-input ${errors.latitud ? 'error' : ''}`}
            />
            {errors.latitud && <p className="error-message">Este campo es requerido</p>}
          </div>
          <div className="form-group">
            <label htmlFor="longitud" className="form-label">Longitud:</label>
            <input
              type="text"
              id="longitud"
              {...register('longitud', { required: true })}
              className={`form-input ${errors.longitud ? 'error' : ''}`}
            />
            {errors.longitud && <p className="error-message">Este campo es requerido</p>}
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">Crear Ubicación</button>
          </div>
        </form>
        {error && <p className='error-message'>{error}</p>}
      </div>
      
      <GoBack />
    </div>
  );
};
  
  export default Form;

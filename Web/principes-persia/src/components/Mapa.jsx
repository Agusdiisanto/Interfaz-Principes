import { GoogleMap, HeatmapLayer, Marker, LoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { obtenerUbicaciones } from '../services/Api';

const Mapa = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obtenerUbicaciones()
      .then((response) => {
        setUbicaciones(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones:', error);
        setIsLoading(false);
      });
  }, []);

  const apiKey = 'AIzaSyCnDWBNKgid2JWaf_H8dSaPHVWsLvNZ7lo'; // Reemplaza esto con tu clave de API

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -34.7207,
    lng: -58.2528,
  };

  const getAlertaPeso = (alerta) => {
    switch (alerta) {
      case 'Rojo':
        return 10;
      case 'Amarillo':
        return 5;
      case 'Verde':
        return 1;
      default:
        return 0;
    }
  };

  const getAlertaColor = (alerta) => {
    switch (alerta) {
      case 'Rojo':
        return 'red';
      case 'Amarillo':
        return 'yellow';
      case 'Verde':
        return 'green';
      default:
        return 'gray';
    }
  };

  if (isLoading) {
    return <div>Cargando ubicaciones...</div>; // Muestra un indicador de carga mientras se obtienen las ubicaciones
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['visualization']}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {ubicaciones.map((ubicacion) => (
          <Marker
            key={ubicacion.id}
            position={{ lat: ubicacion.latitud, lng: ubicacion.longitud }}
            icon={{
              path: 'M10 0 L0 20 L20 20 Z', // Icono de marcador circular
              fillColor: getAlertaColor(ubicacion.alerta), // Color del marcador según la alerta
              fillOpacity: 1,
              scale: 1,
              strokeColor: '#000',
              strokeWeight: 1,
            }}
          />
        ))}
        <HeatmapLayer
          data={ubicaciones.map((ubicacion) => ({
            location: new window.google.maps.LatLng(ubicacion.latitud, ubicacion.longitud),
            weight: getAlertaPeso(ubicacion.alerta), // Peso del punto según la alerta
          }))}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Mapa;

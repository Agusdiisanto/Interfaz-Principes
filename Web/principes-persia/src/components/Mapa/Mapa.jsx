import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from 'react';
import { obtenerUbicaciones } from '../../services/Api';
import "leaflet/dist/images/marker-shadow.png";

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

  const center = [-34.7207, -58.2528];
  const zoom = 12;

  if (isLoading) {
    return <div>Cargando ubicaciones...</div>; // Muestra un indicador de carga mientras se obtienen las ubicaciones
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ubicaciones.map((ubicacion) => (
        <Marker
          key={ubicacion.nombre} // Asegúrate de proporcionar una clave única
          position={[ubicacion.latitud, ubicacion.longitud]}
        >
          <Popup>{ubicacion.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Mapa;

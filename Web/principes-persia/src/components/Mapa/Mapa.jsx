import { MapContainer, TileLayer, Circle, Popup, Polygon, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { obtenerUbicaciones, obtenerDistritos } from '../../services/Api';
import "leaflet/dist/images/marker-shadow.png";
import Loader from "../../utils/Loader/Loader"

const CircleMarker = ({ ubicacion }) => {
  const map = useMap();
  const zoomFactor = 1; // Ajusta el factor de reducción del radio del círculo

  const radius = 1000 * Math.pow(zoomFactor, map.getZoom()); // Ajusta el tamaño del círculo según el zoom

  let color;
  switch (ubicacion.alerta) {
    case 'Rojo':
      color = 'red';
      break;
    case 'Amarillo':
      color = 'yellow';
      break;
    case 'Verde':
      color = 'green';
      break;
    default:
      color = 'blue';
      break;
  }

  return (
    <Circle
      center={[ubicacion.latitud, ubicacion.longitud]}
      radius={radius}
      color={color}
      fill={true}
      fillColor={color}
      fillOpacity={0.4}
    >
      <Popup>{ubicacion.nombre}</Popup>
    </Circle>
  );
};

const Mapa = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([obtenerUbicaciones(), obtenerDistritos()])
      .then(([ubicacionesResponse, distritosResponse]) => {
        setUbicaciones(ubicacionesResponse);
        setDistritos(distritosResponse);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las ubicaciones y distritos:', error);
        setIsLoading(false);
      });
  }, []);

  const center = [-34.7207, -58.2528];
  const zoom = 12;

  if (isLoading) {
    return <Loader/>; 
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {ubicaciones.map((ubicacion) => (
        <CircleMarker key={ubicacion.nombre} ubicacion={ubicacion} />
      ))}
      {distritos.map((distrito, index) => (
        <Polygon
          key={index} 
          positions={distrito.area}
          color="blue"
        />
      ))}
    </MapContainer>
  );
};

export default Mapa;

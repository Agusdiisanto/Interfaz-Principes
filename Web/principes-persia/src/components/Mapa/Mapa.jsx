import { MapContainer, TileLayer, Circle, Popup, Polygon } from 'react-leaflet';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { obtenerUbicaciones, obtenerDistritos } from '../../services/Api';
import "leaflet/dist/images/marker-shadow.png";
import Loader from "../../utils/Loader/Loader"

const CircleMarker = ({ ubicacion, zoom }) => {
  const zoomFactor = 0.5; // Ajusta el factor de reducción del radio del círculo

  const getRadius = () => {
    const baseRadius = 6000; // Ajusta el radio base según tus necesidades
    const adjustedZoom = zoom - 1; // Ajusta el zoom según tus necesidades
    const radius = baseRadius * Math.pow(zoomFactor, adjustedZoom);
    return Math.max(radius, 1000); // Establece un radio mínimo para evitar que se hagan demasiado pequeños
  };

  const radius = getRadius();

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

CircleMarker.propTypes = {
  ubicacion: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    latitud: PropTypes.number.isRequired,
    longitud: PropTypes.number.isRequired,
    alerta: PropTypes.string.isRequired,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
};

const Mapa = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(12);

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

  if (isLoading) {
    return <Loader />;
  }

  // Calcular la densidad de ubicaciones por distrito
  const densityMap = {};
  ubicaciones.forEach((ubicacion) => {
    const { nombre } = ubicacion;
    densityMap[nombre] = densityMap[nombre] ? densityMap[nombre] + 1 : 1;
  });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100vh' }}
      whenCreated={(map) => {
        setZoom(map.getZoom()); // Actualizar el valor inicial del zoom
        map.on('zoomend', () => {
          setZoom(map.getZoom());
        });
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {distritos.map((distrito, index) => {
        const density = densityMap[distrito.nombre] || 0;
        const opacity = density / 10; // Ajusta el valor divisor según tus necesidades
        return (
          <Polygon
            key={index}
            positions={distrito.area}
            color="blue"
            fillOpacity={opacity}
          />
        );
      })}
      {ubicaciones.map((ubicacion) => (
        <CircleMarker
          key={ubicacion.nombre}
          ubicacion={ubicacion}
          zoom={zoom}
        />
      ))}
    </MapContainer>
  );
};

export default Mapa;

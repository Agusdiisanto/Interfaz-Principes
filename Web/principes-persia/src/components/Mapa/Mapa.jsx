import { MapContainer, TileLayer, Circle, Popup, Polygon } from "react-leaflet";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { obtenerDistritos } from "../../services/Api";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import "leaflet/dist/images/marker-shadow.png";
import Loader from "../../utils/Loader/Loader";
import GoBack from "../../utils/GoBack";

const CircleMarker = ({ ubicacion, zoom }) => {
  const zoomFactor = 0.5; // Ajusta el factor de reducción del radio del círculo
  const baseRadius = 1000; // Ajusta el radio base según tus necesidades
  const minRadius = 1000; // Establece un radio mínimo para evitar que se hagan demasiado pequeños

  const getRadius = () => {
    const adjustedZoom = zoom - 1; // Ajusta el zoom según tus necesidades
    const radius = baseRadius * Math.pow(zoomFactor, adjustedZoom);
    return Math.max(radius, minRadius);
  };

  const radius = getRadius();

  const getColor = () => {
    switch (ubicacion.alerta) {
      case "Rojo":
        return "red";
      case "Amarillo":
        return "yellow";
      case "Verde":
        return "green";
      default:
        return "blue";
    }
  };

  const color = getColor();

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
  const db = getFirestore(); // Obtén una referencia a Firestore

  useEffect(() => {
    const loadDistritos = async () => {
      try {
        const distritosResponse = await obtenerDistritos();
        setDistritos(distritosResponse);
      } catch (error) {
        console.error("Error al obtener los distritos:", error);
      }
    };

    loadDistritos();
  }, []);

  useEffect(() => {
    const ubicacionesRef = collection(db, "ubicacion");

    const unsubscribe = onSnapshot(ubicacionesRef, (snapshot) => {
      const ubicacionesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUbicaciones(ubicacionesData);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cancela la suscripción cuando el componente se desmonta
  }, [db]);

  const center = [-34.7207, -58.2528];

  useEffect(() => {
    const ubicacionesRef = collection(db, "ubicacion");
  
    const unsubscribe = onSnapshot(ubicacionesRef, (snapshot) => {
      const ubicacionesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUbicaciones(ubicacionesData);
      setIsLoading(false);
    });
  
    return () => unsubscribe(); // Cancela la suscripción cuando el componente se desmonta
  }, [db]);

  const calculateDensityMap = () => {
    const densityMap = {};
    ubicaciones.forEach((ubicacion) => {
      const { nombre } = ubicacion;
      densityMap[nombre] = densityMap[nombre] ? densityMap[nombre] + 1 : 1;
    });
    return densityMap;
  };

  const densityMap = calculateDensityMap();

  const handleMapCreated = (map) => {
    setZoom(map.getZoom()); // Actualizar el valor inicial del zoom
    map.on("zoomend", () => {
      setZoom(map.getZoom());
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100vh" }}
      whenCreated={handleMapCreated}
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
          key={ubicacion.id}
          ubicacion={ubicacion}
          zoom={zoom}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          zIndex: 1000,
        }}
      >
        <GoBack />
      </div>
    </MapContainer>
  );
};

export default Mapa;

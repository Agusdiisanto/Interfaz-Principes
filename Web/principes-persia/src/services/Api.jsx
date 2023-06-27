import axios from 'axios';

const BASE_URL = 'http://localhost:8080/ubicacion';

const crearUbicacion = (ubicacionDTO) => {
  return axios.post(`${BASE_URL}`, ubicacionDTO)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const recuperarUbicacion = (ubicacionId) => {
  return axios.get(`${BASE_URL}/${ubicacionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const obtenerUbicaciones = () => {
  return axios.get(`${BASE_URL}/ubicaciones`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const moverVector = (vectorId, ubicacionId) => {
  return axios.put(`${BASE_URL}/mover/${vectorId}/${ubicacionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const moverMasCorto = (vectorId, ubicacionNombre) => {
  return axios.put(`${BASE_URL}/moverMasCorto/${vectorId}/${ubicacionNombre}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const conectarUbicaciones = (conectarDTO) => {
  return axios.put(`${BASE_URL}/conectar`, conectarDTO)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const obtenerConectados = (ubicacionOrigen) => {
  return axios.get(`${BASE_URL}/conectados/${ubicacionOrigen}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

const expandirUbicacion = (ubicacionId) => {
  return axios.put(`${BASE_URL}/expandir/${ubicacionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data);
    });
};

export {
  crearUbicacion,
  recuperarUbicacion,
  obtenerUbicaciones,
  moverVector,
  moverMasCorto,
  conectarUbicaciones,
  obtenerConectados,
  expandirUbicacion,
};

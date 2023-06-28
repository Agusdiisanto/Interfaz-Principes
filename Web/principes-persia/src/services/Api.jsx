import axios from 'axios';

const BASE_URL = 'http://localhost:8080/ubicacion';

const crearUbicacion = async (ubicacionDTO) => {
  try {
    const response = await axios.post(`${BASE_URL}`, ubicacionDTO);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const recuperarUbicacion = async (ubicacionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${ubicacionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerUbicaciones = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ubicaciones`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const moverVector = async (vectorId, ubicacionId) => {
  try {
    const response = await axios.put(`${BASE_URL}/mover/${vectorId}/${ubicacionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const moverMasCorto = async (vectorId, ubicacionNombre) => {
  try {
    const response = await axios.put(`${BASE_URL}/moverMasCorto/${vectorId}/${ubicacionNombre}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const conectarUbicaciones = async (conectarDTO) => {
  try {
    const response = await axios.put(`${BASE_URL}/conectar`, conectarDTO);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const obtenerConectados = async (ubicacionOrigen) => {
  try {
    const response = await axios.get(`${BASE_URL}/conectados/${ubicacionOrigen}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const expandirUbicacion = async (ubicacionId) => {
  try {
    const response = await axios.put(`${BASE_URL}/expandir/${ubicacionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
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

import axios from "axios";
import config from "../config.json";
import { jwtDecode } from "jwt-decode";

const apiEndpoint = config;

export function getCurrentID() {
  try {
    const jwt = localStorage.getItem("JWT");
    let decoded = jwtDecode(jwt);
    return decoded.id;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(id) {
  try {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      axios.defaults.headers.common["x-auth-token"] = jwt;
      const promise = await axios.post(apiEndpoint + "/getCurrentUser", {
        params: { id: id },
      });
      const { data: sqlObj } = promise;
      return sqlObj;
    }
  } catch (error) {
    return null;
  }
}

export const getAllLocations = async () => {
  try {
    let promise = await axios.get(`http://localhost:8000/path/getAllLocations`);
    const { data: response } = promise;
    return response;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllreservations = async () => {
  try {
    let promise = await axios.get(`http://localhost:8000/path/getAllreservations`);
    const { data: response } = promise;
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getLocationById = async (id) => {
  try {
    let promise = await axios.get(`http://localhost:8000/path/getLocationById/${id}`);
    const { data: response } = promise;
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getReservationById = async (id) => {
  try {
    let promise = await axios.get(`http://localhost:8000/path/getReservationById/${id}`);
    const { data: response } = promise;
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserLocationsById = async (id) => {
  try {
    let promise = await axios.get(`http://localhost:8000/path/getUserLocationsById/${id}`);
    const { data: response } = promise;
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/path/register', userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addProperty = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/path/addProperty', userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const book = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/path/book', userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const Message = async () => {
  try {
    let response = await axios.get(`http://localhost:8000/path/message`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPropertyId= async () => {
  try {
    let response = await axios.get(`http://localhost:8000/path/getPropertyId`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/path/login', userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export async function session(params) {
  try {
    const promise = await axios.post(apiEndpoint.url + "/path/getJWT", params);
    const { data: response } = promise;
    localStorage.setItem("JWT", response.token);
    return getCurrentID();
  } catch (error) {
    console.error(error);
    return error;
  }
}

const module = {
  getCurrentID,
  getCurrentUser,
  getAllLocations,
  getAllreservations,
  getReservationById,
  getLocationById,
  register,
  login,
  session,
  book,
  addProperty,
  getUserLocationsById,
  getPropertyId,
};

export default module;
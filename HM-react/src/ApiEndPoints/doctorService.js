
import axios from 'axios';

const baseURL = 'http://localhost:8000';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getDoctors = async (token) => {
  const response = await axios.get(`${baseURL}/doctors/`, getAuthHeaders(token));
  return response.data;
};

export const getDoctor = async (id, token) => {
  const response = await axios.get(`${baseURL}/doctors/${id}`, getAuthHeaders(token));
  return response.data;
};

export const createDoctor = async (doctor, token) => {
  const response = await axios.post(`${baseURL}/doctors/`, doctor, getAuthHeaders(token));
  return response.data;
};

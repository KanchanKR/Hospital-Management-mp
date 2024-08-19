import axios from 'axios';

const baseURL = 'http://localhost:8000';

export const signUp = async (username, email, password, role) => {
  const response = await axios.post(`${baseURL}/signup/`, { username, email, password, role });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${baseURL}/login/`, { email, password });
  return response.data;
};
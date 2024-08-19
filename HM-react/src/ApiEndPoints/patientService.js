import axios from 'axios';


const baseURL = 'http://localhost:8000';


export const getPatients = async () => {
  const response = await axios.get(`${baseURL}/patients/`);
  return response.data;
};

export const getPatient = async (id) => {
  const response = await axios.get(`${baseURL}/patients/${id}`);
  return response.data;
};

export const createPatient = async (patient) => {
    const response = await axios.post(`${baseURL}/patients/`, { patient, user_id: patient.user_id });
    return response.data;
  };
  

export const getPatientsByUserId = async (userId) => {
  const response = await axios.get(`${baseURL}/patients/by_user/`, {
    params: { user_id: userId },
    });
  return response.data;
};
  

export const updatePatient = async (id, patient) => {
  const response = await axios.put(`${baseURL}/patients/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await axios.delete(`${baseURL}/patients/${id}`);
  return response.data;
};

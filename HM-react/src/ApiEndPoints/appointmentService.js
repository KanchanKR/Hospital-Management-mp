import axios from 'axios';

const baseURL = 'http://localhost:8000';

// export const createAppointment = async (appointment) => {
//   const response = await axios.post(`${baseURL}/appointments/`, appointment);
//   return response.data;
// };

export const createAppointment = async (appointment) => {
  const response = await axios.post(`${baseURL}/appointments/`, appointment);
  return response.data;
};

export const getAppointment = async (appointmentId) => {
    const response = await axios.get(`${baseURL}/appointments/${appointmentId}/`);
    return response.data;
  };

export const getAppointmentByUserId = async (userId) => {
  const response = await axios.get(`${baseURL}/appointments/by_user/`, {
    params: { user_id: userId },
    });
  return response.data;
};

  export const getAllAppointments = async () => {
    const response = await axios.get(`${baseURL}/appointments/`);
    return response.data;
  };

  export const updateAppointment = async (appointmentId, updatedData) => {
    const response = await axios.put(`${baseURL}/appointments/${appointmentId}/`, updatedData);
    return response.data;
  };

  export const deleteAppointment = async (appointmentId) => {
    const response = await axios.delete(`${baseURL}/appointments/${appointmentId}/`);
    return response.data;
  };
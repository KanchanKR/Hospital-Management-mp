/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAppointmentByUserId, deleteAppointment, updateAppointment } from '../ApiEndPoints/appointmentService';
import { toast } from 'react-toastify';
import { getPatient } from '../ApiEndPoints/patientService';
import { getDoctor } from '../ApiEndPoints/doctorService';
import { useAuth } from '../AuthContext/AuthContext';

const BookedAppointments = ({ refreshAppointments }) => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {

    if (!isAuthenticated) return;

    const fetchAppointments = async () => {
      try {
        const result = await getAppointmentByUserId(userId);
        setAppointments(result);

        // Fetch patient and doctor details
        const patientPromises = result.map((appointment) => 
          getPatient(appointment.patient_id).then(patient => ({ id: appointment.patient_id, name: patient.name }))
        );
        const doctorPromises = result.map((appointment) => 
          getDoctor(appointment.doctor_id).then(doctor => ({ id: appointment.doctor_id, name: doctor.name }))
        );

        const patientsData = await Promise.all(patientPromises);
        const doctorsData = await Promise.all(doctorPromises);

        setPatients(patientsData.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {}));
        setDoctors(doctorsData.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {}));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
  }, [userId, refreshAppointments, isAuthenticated ]);

  if (!isAuthenticated) {
    return <p className="text-textColor">Please log in to view your appointments.</p>;
  }

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
      toast.success("Appointment deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete appointment.");
      console.log(error);
    }
  };

  const handleEdit = async (appointmentId) => {
    navigate(`/edit-appointment/${appointmentId}`);
  };

  return (
    <div className="border border-solid border-gray-200 p-5 rounded-lg">
      <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-5">
        My Booked <span className="text-primaryColor">Appointments</span>
      </h3>
      {appointments.length === 0 ? (
        <p className="text-textColor">No appointments booked yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p>Patient: {patients[appointment.patient_id] || 'Loading...'}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time Slot: {appointment.time_slot}</p>
                  <p>Doctor: {doctors[appointment.doctor_id] || 'Loading...'}</p>
                </div>
                <div>
                  <button
                    className="bg-primaryColor text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleEdit(appointment.id, {/* updated data here */})}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedAppointments;

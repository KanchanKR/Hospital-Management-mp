import { useState, useEffect } from 'react';
import { getDoctors } from '../ApiEndPoints/doctorService';
import { getPatientsByUserId } from '../ApiEndPoints/patientService';
import { createAppointment } from '../ApiEndPoints/appointmentService';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import BookedAppointments from './BookedAppointments';  // Separate component for booked appointments

const BookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({
    user_id:'',
    patient_id: '',
    date: '',
    time_slot: '', // Added time_slot for afternoon/evening
    doctor_id: '',
    status: false
  });
  const [patients, setPatients] = useState([]);  // To store patients data
  const [doctors, setDoctors] = useState([]);
  const [refreshAppointments, setRefreshAppointments] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {

    if (!isAuthenticated) {
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (userId) {
      setAppointment((prevState) => ({ ...prevState, user_id: userId }));  // Automatically set user_id in appointment state
      console.log("User ID:", userId);
      
      const fetchData = async () => {
        try {
          const patientData = await getPatientsByUserId(userId);
          setPatients(patientData);
  
          const doctorsData = await getDoctors();  // Fetch doctors
          setDoctors(doctorsData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      console.log("User ID not found in localStorage.");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAppointment({
      ...appointment,
      [name]: 
        // Convert patient_id and doctor_id to integers
        name === 'patient_id' || name === 'doctor_id' ? parseInt(value) : value,
    });
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirects the user to the login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createAppointment(appointment);
      setAppointment({
        user_id: appointment.user_id,  // Keep the user_id in the state
        patient_id: '',
        date: '',
        time_slot: '',
        doctor_id: '',
        status: false
      });
      setLoading(false);
      toast.success("Appointment booked successfully!");
      setRefreshAppointments(prev => prev + 1);
      
    } catch (error) {
      toast.error("Failed to book appointment.");
      console.log(appointment)
      console.log(error);
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    
    return (<section className="px-5 xl:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Book an <span className="text-primaryColor">Appointment</span>
          </h3>
    
          <p className="text-textColor text-[18px] leading-[28px] font-medium mb-7">
            You must <span className="text-primaryColor font-bold">Login</span> first to book an Appointment.
          </p>
    
          <form>
            <div className="mb-5">
              <select
                name="patient_id"
                value={appointment.patient_id}
                disabled
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-not-allowed"
              >
                <option value="" disabled>Select Patient</option>
              </select>
            </div>
    
            <div className="mb-5">
              <input
                type="date"
                placeholder="Date"
                name="date"
                value={appointment.date}
                disabled
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-not-allowed"
              />
            </div>
    
            <div className="mb-5">
              <select
                name="time_slot"
                value={appointment.time_slot}
                disabled
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-not-allowed"
              >
                <option value="" disabled>Select Time Slot</option>
              </select>
            </div>
    
            <div className="mb-5">
              <select
                name="doctor_id"
                value={appointment.doctor_id}
                disabled
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-not-allowed"
              >
                <option value="" disabled>Select Doctor</option>
              </select>
            </div>
    
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handleLoginClick}
                className="bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-3 py-3 flex-1"
              >
                Login to Continue
              </button>
    
              <button
                type="button"
                disabled
                className="bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-3 py-3 flex-1 cursor-not-allowed opacity-50"
              >
                Book Appointment
              </button>
            </div>
          </form>
    
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link to='/register' className="text-primaryColor font-medium ml-1">Sign up</Link>
          </p>
      </div>
    </section>
    
    
    )
  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Appointment Form */}
          <div className="rounded-l-lg lg:pl-16 lg:pr-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Book an <span className="text-primaryColor">Appointment</span>
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <select
                  name="patient_id"
                  value={appointment.patient_id}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - ID: {patient.id}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <input
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={appointment.date}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <select
                  name="time_slot"
                  value={appointment.time_slot}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Time Slot</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              <div className="mb-5">
                <select
                  name="doctor_id"
                  value={appointment.doctor_id}
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}  - ID: {doctor.id}
                  </option>
                  ))}
                </select>
              </div>


              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Booked Appointments Section */}
          <div className="rounded-r-lg lg:pr-16 lg:pl-16 py-10">
            <BookedAppointments refreshAppointments={refreshAppointments} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;

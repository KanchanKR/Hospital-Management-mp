/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { createPatient } from "../ApiEndPoints/patientService";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const AddPatient = () => {
  const [patient, setPatient] = useState({
    user_id: "",
    name: "",
    age: "",
    address: "",
    gender: "",
  });

  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const userId = localStorage.getItem("user_id"); // Fetch the user_id from localStorage
    if (userId) {
      setPatient((prevPatient) => ({
        ...prevPatient,
        user_id: userId,
      }));
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = () => {
    navigate("/login"); // Redirects the user to the login page
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);
    const calculatedAge = calculateAge(dobValue);
    setPatient((prevState) => ({
      ...prevState,
      age: calculatedAge,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setloading(true);
    try {
      await createPatient(patient);
      setPatient({
        user_id: patient.user_id,
        name: "",
        age: "",
        address: "",
        gender: "",
      });
      toast.success("Patient Registered!");
      navigate("/appointment");
    } catch (error) {
      toast.error("Failed to add patient");
      console.error("Failed to add patient", error);
      console.log(patient);
      setError("Failed to add patient. Please check the data and try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="px-5 lg:px-0">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Register <span className="text-primaryColor">Patient</span>
          </h3>

          <p className="text-textColor text-[18px] leading-[28px] font-medium mb-7">
            You must <span className="text-primaryColor font-bold">Login</span>{" "}
            first to register a patient.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-5 md:col-span-2">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={patient.name}
                disabled
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-not-allowed"
              />
            </div>

            <div className="mb-5">
              <input
                type="date"
                name="dob"
                value={dob}
                disabled
                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-not-allowed"
              />
            </div>

            <div className="mb-5">
              <input
                type="text"
                name="age"
                value={patient.age}
                placeholder="Your Age"
                disabled
                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-not-allowed"
              />
            </div>

            <div className="mb-5 md:col-span-2">
              <input
                name="address"
                value={patient.address}
                placeholder="Address"
                disabled
                className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-not-allowed"
              />
            </div>

            <label className="md:col-span-1 text-primaryColor font-bold text-[16px] leading-7">
              Gender:
              <select
                name="gender"
                value={patient.gender}
                disabled
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-not-allowed"
              >
                <option value="">Select</option>
              </select>
            </label>

            <div className="md:col-span-2 flex justify-between items-center gap-4">
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
                Register Patient
              </button>
            </div>
          </form>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <div className="flex justify-between">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Register <span className="text-primaryColor">Patient</span>
          </h3>

          <div style={{ display: "none" }}>
            <label>user_id</label>
            <input
              type="text"
              name="user_id"
              value={patient.user_id}
              onChange={handleChange}
              readOnly // **Highlight 3: Make this field read-only**
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mb-5 md:col-span-2">
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={patient.name}
              onChange={handleChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleDobChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              name="age"
              value={patient.age}
              placeholder="Your Age"
              readOnly
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            />
          </div>

          <div className="mb-5 md:col-span-2">
            <input
              name="address"
              value={patient.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              required
            />
          </div>

          <label className="md:col-span-1 text-primaryColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              required
            >
              <option value="">Select</option>
              <option value="female">Femle</option>
              <option value="male">Male</option>
              <option value="Others">others</option>
            </select>
          </label>
          <p className=" text-textColor text-center  pt-3">
            Registered Already?
            <Link
              to="/appointment"
              className="text-primaryColor font-medium ml-1"
            >
              Click here
            </Link>
          </p>

          <div className="mt-7 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-4"
            >
              {loading ? (
                <HashLoader size={35} color="#ffffff" />
              ) : (
                "Register Patient"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPatient;

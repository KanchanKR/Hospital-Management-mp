/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import PatientOnboarding from '../pages/PatientOnboarding'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import BookAppointment from '../pages/BookAppointment'
const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/home" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/pOnboarding" element={<PatientOnboarding/>} />
    <Route path="/appointment" element={<BookAppointment/>} />
  </Routes>
}

export default Routers

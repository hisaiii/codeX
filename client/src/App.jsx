import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import ComplaintForm from './pages/ComplaintForm';
import Login from "./pages/Login";
import Footer from "./components/Footer";


import ComplaintForm from './pages/ComplaintForm.jsx'


function App() {

  return (
    <>    
      <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Home />
              }
            />
            <Route
              path="/report"
              element={
                <ComplaintForm />
              }
            />
            <Route
              path="/login"
              element={
                <Login />
              }
            />
          </Routes>
          <Footer />

        </Router>
      
    </>
  )
}

export default App

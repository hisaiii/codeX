import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import ComplaintForm from './pages/ComplaintForm';
import Login from "./pages/Login";
import Register from './pages/Register';
import Footer from "./components/Footer";
import AccountCreated from './pages/AccountCreated';
import { ToastProvider } from './contexts/ToastContext';
import { AuthContextProvider } from './contexts/UserAuthContext';
function App() {

  return (
    <> 
  <ToastProvider>
      <AuthContextProvider>
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
          <Route
            path="/register"
            element={
              <Register />
            }
          />
          <Route
            path="/account-created"
            element={
              < AccountCreated/>
            }
          />
        </Routes>
        <Footer />

      </Router>
       
       </AuthContextProvider>

  </ToastProvider>
    
      
      
    </>
  )
}

export default App

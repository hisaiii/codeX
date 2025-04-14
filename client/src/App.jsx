import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AccountCreated from './pages/AccountCreated';
import Home from "./pages/Home";
import ComplaintForm from "./pages/ComplaintForm";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ReportError from './pages/ReportIssue';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContextProvider } from './contexts/UserAuthContext'; // Import the AuthContextProvider
import { ToastProvider } from './contexts/ToastContext';

const AppWrapper = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {/* Navbar is not displayed on Dashboard */}
      {!isDashboard && <Navbar />}

      {/* Routing configuration */}
      <Routes>
        <Route path="/account-created" element={<AccountCreated />} />
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ComplaintForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reporterror" element={<ReportError />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Footer should appear on every page */}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      {/* Wrap the whole app with AuthContextProvider */}
      <ToastProvider>      <AuthContextProvider>
        <AppWrapper />
      </AuthContextProvider></ToastProvider>

    </Router>
  );
}

export default App;

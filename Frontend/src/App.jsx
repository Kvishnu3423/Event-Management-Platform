import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignup";
import ProtectedRoute from "./components/ProtectedRoute";
import BookTicket from "./components/BookTicket"; 
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Update state if token changes
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setToken(null);
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <Router>
      <Navbar />
      {token && (
        <div style={{ textAlign: "right", padding: "10px" }}>
        </div>
      )}
      <Routes>
        {/* If logged in, redirect to Dashboard; otherwise, show LoginSignup */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginSignup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginSignup />} />

        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <>
                <Dashboard />
                <HeroSection />
                <Services />
                <About />
                <Contact />
              </>
            </ProtectedRoute>
          } 
        />
        {/* ✅ Ticket Booking Route */}
        <Route path="/book-ticket/:eventName" element={<BookTicket />} /> {/* ✅ New Booking Page */}
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;

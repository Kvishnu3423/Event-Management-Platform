import { useState } from "react";
import PropTypes from "prop-types";

const Reservation = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Reservation submitted successfully!");
        setFormData({ name: "", email: "", event: "" });
        onClose();
      } else {
        alert("Failed to submit reservation.");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("Something went wrong.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Make A Reservation</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Event:</label>
          <select name="event" value={formData.event} onChange={handleChange}>
            <option value="Choose">Choose One</option>
            <option value="Sankranthi">Sankranthi</option>
            <option value="Ugadhi">Ugadhi</option>
            <option value="Holi">Holi</option>
            <option value="Ganesh Chathurthi">Ganesh Chathurthi</option>
            <option value="Dussehra">Dussehra</option>
            <option value="Diwali">Diwali</option>
          </select>

          <label>Rooms:</label>
          <select name="rooms" value={formData.Rooms} onChange={handleChange}>
            <option value="Choose">Select room</option>
            <option value="100">100</option>
            <option value="110">110</option>
            <option value="112">112</option>
            <option value="114">114</option>
          </select>

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose} className="close-btn">Close</button>
        </form>
      </div>
    </div>
  );
};

Reservation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Reservation;

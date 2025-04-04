import PropTypes from "prop-types"; // Import PropTypes

const Reservation = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Make A Reservation</h2>
        <form>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Event:</label>
          <select>
            <option value="Sankranthi">Sankranthi</option>
            <option value="Ugadhi">Ugadhi</option>
            <option value="Holi">Holi</option>
            <option value="Ganesh Chathurthi ">Ganesh Chathurthi</option>
            <option value="Dussehra">Dussehra</option>
            <option value="Diwali">Diwali</option>
          </select>

          <label>Rooms:</label>
          <select>
            <option value="select room">Select a Room</option>
            <option value="SSM100">SSM100</option>
            <option value="SSM102">SSM102</option>
            <option value="SSM103">SSM103</option>
            <option value="SSM106">SSM106</option>
            <option value="SSM110">SSM110</option>
            <option value="SSM112">SSM112</option>
          </select>

          <button type="submit">Submit</button>
          <button type="button" onClick={onClose} className="close-btn">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
Reservation.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean
  onClose: PropTypes.func.isRequired, // onClose must be a function
};

export default Reservation;

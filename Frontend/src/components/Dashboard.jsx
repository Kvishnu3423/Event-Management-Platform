import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // ✅ Import Logout Icon
import "./Dashboard.css"; // ✅ Import CSS

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("userId"); // Remove user ID
    alert("You have been logged out.");
    navigate("/"); // ✅ Redirect to home after logout
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-button">
        <FaSignOutAlt className="logout-icon" /> Sign Out
      </button>
    </div>
  );
};

export default Dashboard;

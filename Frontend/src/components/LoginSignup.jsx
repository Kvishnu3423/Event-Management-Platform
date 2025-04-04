import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Track if user is admin
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl;

      if (isLogin) {
        // 🔹 Admin or User Login API URL
        apiUrl = isAdmin
          ? "http://localhost:4000/api/v1/admin/login"  // Admin login URL
          : "http://localhost:4000/api/v1/auth/login";       // Regular user login URL

        const res = await axios.post(apiUrl, { email, password });
        localStorage.setItem("token", res.data.token);  // Store token in localStorage

        alert("Login successful!");

        await fetchDashboard();

      } else {
        // 🔹 Admin or User Signup API URL
        alert("Test");
        apiUrl = isAdmin
          ? "http://localhost:4000/api/v1/admin/signup"  // Admin signup URL
          : "http://localhost:4000/api/v1/auth/signup";       // Regular user signup URL

        await axios.post(apiUrl, { name, email, password });
        alert("Signup successful!");
      }
      navigate("/Dashboard");
    } catch (error) {
      alert(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please log in again.");
      return;
    }

    const res = await fetch("http://localhost:4000/api/v1/admin/dashboard", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Admin Dashboard Data:", data); // Show the admin dashboard info
    } else {
      alert("Failed to fetch dashboard data");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* Checkbox to toggle between Admin and Regular User */}
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Admin
        </label>

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p onClick={toggleMode} className="toggle-link">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default LoginSignup;

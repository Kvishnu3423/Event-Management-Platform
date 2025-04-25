import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let apiUrl;

      if (isLogin) {
        apiUrl = isAdmin
          ? "http://localhost:5000/api/v1/admin/login"
          : "http://localhost:4000/api/v1/auth/login";

        const res = await axios.post(apiUrl, { email, password });
        localStorage.setItem("token", res.data.token);

        alert("Login successful!");
        if (isAdmin) await fetchDashboard();

        navigate("/Dashboard");
      } else {
        apiUrl = isAdmin
          ? "http://localhost:5000/api/v1/admin/signup"
          : "http://localhost:4000/api/v1/auth/signup";

        await axios.post(apiUrl, { name, email, password });
        alert("Signup successful! Please log in.");
        setIsLogin(true);
        return;
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please log in again.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/v1/admin/dashboard", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Admin Dashboard Data:", data);
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

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          Admin
        </label>

        <button type="submit" disabled={loading}>
          {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p onClick={toggleMode} className="toggle-link">
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default LoginSignup;

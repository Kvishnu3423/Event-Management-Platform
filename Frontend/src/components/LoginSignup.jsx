import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // 🔹 Toggle for admin mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdmin
        ? isLogin
          ? "http://localhost:4000/api/v1/admin/login"
          : "http://localhost:4000/api/v1/admin/signup"
        : isLogin
        ? "http://localhost:4000/api/v1/auth/login"
        : "http://localhost:4000/api/v1/auth/signup";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await axios.post(endpoint, payload);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        alert(`${isAdmin ? "Admin" : "User"} login successful!`);
      } else {
        alert(`${isAdmin ? "Admin" : "User"} signup successful!`);
      }

      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isAdmin ? (isLogin ? "Admin Login" : "Admin Sign Up") : isLogin ? "Login" : "Sign Up"}</h2>
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
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p onClick={toggleMode} className="toggle-link">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </p>
      <p onClick={toggleAdminMode} className="toggle-link">
        {isAdmin ? "Switch to User Mode" : "Switch to Admin Mode"}
      </p>
    </div>
  );
};

export default LoginSignup;
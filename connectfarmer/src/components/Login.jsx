import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to check credentials
      const response = await fetch(
        `http://localhost:5000/registration?email=${email}&password=${password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setMessage("Login successful! Redirecting...");
        localStorage.setItem("userId", data[0].id);
        window.dispatchEvent(new Event("storage"));
        navigate(`/`);
      } else {
        setMessage("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-success bg-opacity-25">
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Farmer Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Login
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}

        {/* Extra Links */}
        <p className="text-center text-muted mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="text-success fw-semibold">
            Register here
          </Link>
        </p>
        <p className="text-center text-muted mt-3 mb-0">
          Login In Admin Role?{" "}
          <Link to="/admin/login" className="text-success fw-semibold">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

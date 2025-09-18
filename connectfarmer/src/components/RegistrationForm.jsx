import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Check if email already exists
      const checkRes = await fetch(
        `http://localhost:5000/registration?email=${formData.email}`
      );
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        setMessage("Email already registered! Please login instead.");
        return;
      }

      
      const response = await fetch("http://localhost:5000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData, createdAt: new Date().toISOString()}),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        navigate("/login");
        setFormData({ name: "", email: "", password: "", location: "" });
      } else {
        setMessage("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-success bg-opacity-25">
      <div className="card shadow-lg p-4" style={{ width: "420px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Farmer Registration</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location Dropdown */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <select
              className="form-select"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">-- Select your location --</option>
              <option value="Tijara">Tijara</option>
              <option value="Alwar">Alwar</option>
              <option value="Bhiwadi">Bhiwadi</option>
              <option value="Kishangarh">Kishangarh</option>
            </select>
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Register
          </button>
        </form>

        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}

export default RegistrationForm;

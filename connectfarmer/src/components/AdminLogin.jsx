import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/admin?email=${email}&password=${password}`
            );
            const data = await response.json();

            if (data.length > 0) {
                const admin = data[0];
                setMessage("Admin login successful! Redirecting...");
                localStorage.setItem("isAdmin", true);
                // storage event trigger karo
                window.dispatchEvent(new Event("storage"));

                localStorage.setItem("adminId", admin.id);
                localStorage.setItem("adminName", admin.name);
                navigate("/");
            } else {
                setMessage("Invalid admin credentials!");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Server error!");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-dark bg-opacity-25">
            <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Admin Login</h3>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter admin email"
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
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-semibold">
                        Login
                    </button>
                </form>
                {message && <p className="text-center mt-3">{message}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function CreatemainCategory() {
  const [formData, setFormData] = useState({ name: "", duration: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // login user ka id

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/maincategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: userId, // current user ke saath link
        }),
      });

      if (response.ok) {
        setMessage("✅ Category created successfully!");
        setFormData({ name: "", duration: "" });
        setTimeout(() => {
          navigate("/user/maincategory"); // redirect after 1.5 sec
        }, 1500);
      } else {
        setMessage("❌ Failed to create category!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Server error!");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <h5 className="text-center text-light bg-dark p-2 fw-bold">
            Create Main Category
          </h5>

          <div className="card shadow p-4 mt-3">
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-3">
                <label className="form-label fw-bold">Farming Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Duration Field */}
              <div className="mb-3">
                <label className="form-label fw-bold">Duration</label>
                <input
                  type="text"
                  name="duration"
                  className="form-control"
                  placeholder="e.g. 6 months"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-success fw-bold">
                Save Category
              </button>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatemainCategory;

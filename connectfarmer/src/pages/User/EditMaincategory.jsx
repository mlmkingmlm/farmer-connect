import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function EditMaincategory() {
  const { id } = useParams(); // URL se category id
  const [formData, setFormData] = useState({ name: "", duration: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch category data on load
  useEffect(() => {
    fetch(`http://localhost:5000/maincategory/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          duration: data.duration,
        });
      })
      .catch((err) => console.error("Error:", err));
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/maincategory/${id}`, {
        method: "PUT", // full update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: parseInt(localStorage.getItem("userId")), // user link maintain
        }),
      });

      if (response.ok) {
        setMessage("✅ Category updated successfully!");
        setTimeout(() => {
          navigate("/user/maincategory"); // back to list
        }, 1500);
      } else {
        setMessage("❌ Failed to update category!");
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
            Edit Main Category
          </h5>

          <div className="card shadow p-4 mt-3">
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-3">
                <label className="form-label fw-bold">Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
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
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-success fw-bold">
                Update Category
              </button>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMaincategory;

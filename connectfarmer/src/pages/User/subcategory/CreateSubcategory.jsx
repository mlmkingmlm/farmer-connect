import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

function CreateSubcategory() {
  const [formData, setFormData] = useState({
    name: "",
    things: "",
    insurance: "",
    mainCategoryId: "",
  });
  const [maincategories, setMaincategories] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/maincategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setMaincategories(data));
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/subcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: userId }),
      });

      if (response.ok) {
        setMessage("✅ Subcategory created successfully!");
        setTimeout(() => {
          navigate("/user/subcategory");
        }, 1500);
      } else {
        setMessage("❌ Failed to create subcategory!");
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
            Create Subcategory
          </h5>
          <div className="card shadow p-4 mt-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Crop Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  Placeholder="Enter the crop name (e.g., Wheat, Rice, Cotton)"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Required Resources</label>
                <textarea
                  name="things"
                  className="form-control"
                  value={formData.things}
                  onChange={handleChange}
                  Placeholder="List resources needed (e.g., Seeds, Fertilizer, Water, Labor)"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Insurance</label>
                <select
                  name="insurance"
                  className="form-select"
                  value={formData.insurance}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Select Main Category</label>
                <select
                  name="mainCategoryId"
                  className="form-select"
                  value={formData.mainCategoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose --</option>
                  {maincategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.duration})
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-success fw-bold">
                Save Subcategory
              </button>
            </form>
            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSubcategory;

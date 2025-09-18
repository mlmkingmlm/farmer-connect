import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

function EditSubcategory() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    things: "",
    insurance: "",
    mainCategoryId: "",
  });
  const [maincategories, setMaincategories] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/subcategory/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          name: data.name,
          things: data.things,
          insurance: data.insurance,
          mainCategoryId: data.mainCategoryId,
        })
      );

    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:5000/maincategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setMaincategories(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/subcategory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId:localStorage.getItem("userId"),
        }),
      });

      if (response.ok) {
        setMessage("✅ Subcategory updated successfully!");
        setTimeout(() => {
          navigate("/user/subcategory");
        }, 1500);
      } else {
        setMessage("❌ Failed to update subcategory!");
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
            Edit Subcategory
          </h5>
          <div className="card shadow p-4 mt-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Fasal Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Things Needed</label>
                <textarea
                  name="things"
                  className="form-control"
                  value={formData.things}
                  onChange={handleChange}
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
                Update Subcategory
              </button>
            </form>
            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSubcategory;

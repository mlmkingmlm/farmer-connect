import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

function CreateCost() {
  const [formData, setFormData] = useState({
    subcategoryId: "",
    landPreparation: "",
    seedCost: "",
    fertilizers: "",
    irrigation: "",
    labor: "",
    machinery: "",
    miscellaneous: "",
  });
  const [subcategories, setSubcategories] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ✅ Fetch user-specific subcategories
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/subcategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data))
        .catch((err) => console.error("Error fetching subcategories:", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Calculate total automatically
  const calculateTotal = () => {
    const values = [
      formData.landPreparation,
      formData.seedCost,
      formData.fertilizers,
      formData.irrigation,
      formData.labor,
      formData.machinery,
      formData.miscellaneous,
    ].map((v) => parseInt(v) || 0);
    return values.reduce((a, b) => a + b, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subcategoryId) {
      setMessage("⚠️ Please select a subcategory!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/farmingcost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: userId,
          totalCost: calculateTotal(),
        }),
      });

      if (response.ok) {
        setMessage("✅ Farming cost added successfully!");
        setTimeout(() => {
          navigate("/user/cost");
        }, 1500);
      } else {
        setMessage("❌ Failed to save cost!");
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
            Add Detailed Farming Costs
          </h5>

          <div className="card shadow p-4 mt-3">
            <form onSubmit={handleSubmit}>
              {/* Subcategory Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Subcategory (Crop)</label>
                <select
                  name="subcategoryId"
                  className="form-select"
                  value={formData.subcategoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose Crop --</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} (Insurance: {sub.insurance})
                    </option>
                  ))}
                </select>
              </div>

              {/* Land Preparation */}
              <div className="mb-3">
                <label className="form-label fw-bold">Land Preparation (₹)</label>
                <input
                  type="number"
                  name="landPreparation"
                  className="form-control"
                  value={formData.landPreparation}
                  onChange={handleChange}
                />
              </div>

              {/* Seed Cost */}
              <div className="mb-3">
                <label className="form-label fw-bold">Seed Cost (₹)</label>
                <input
                  type="number"
                  name="seedCost"
                  className="form-control"
                  value={formData.seedCost}
                  onChange={handleChange}
                />
              </div>

              {/* Fertilizers */}
              <div className="mb-3">
                <label className="form-label fw-bold">Fertilizers & Pesticides (₹)</label>
                <input
                  type="number"
                  name="fertilizers"
                  className="form-control"
                  value={formData.fertilizers}
                  onChange={handleChange}
                />
              </div>

              {/* Irrigation */}
              <div className="mb-3">
                <label className="form-label fw-bold">Irrigation (₹)</label>
                <input
                  type="number"
                  name="irrigation"
                  className="form-control"
                  value={formData.irrigation}
                  onChange={handleChange}
                />
              </div>

              {/* Labor */}
              <div className="mb-3">
                <label className="form-label fw-bold">Labor Cost (₹)</label>
                <input
                  type="number"
                  name="labor"
                  className="form-control"
                  value={formData.labor}
                  onChange={handleChange}
                />
              </div>

              {/* Machinery */}
              <div className="mb-3">
                <label className="form-label fw-bold">Machinery / Tractor Rent (₹)</label>
                <input
                  type="number"
                  name="machinery"
                  className="form-control"
                  value={formData.machinery}
                  onChange={handleChange}
                />
              </div>

              {/* Miscellaneous */}
              <div className="mb-3">
                <label className="form-label fw-bold">Miscellaneous (₹)</label>
                <input
                  type="number"
                  name="miscellaneous"
                  className="form-control"
                  value={formData.miscellaneous}
                  onChange={handleChange}
                />
              </div>

              {/* Total (Read only) */}
              <div className="mb-3">
                <label className="form-label fw-bold">Total Cost (₹)</label>
                <input
                  type="text"
                  className="form-control fw-bold text-success"
                  value={calculateTotal()}
                  readOnly
                />
              </div>

              <button type="submit" className="btn btn-success fw-bold">
                Save Costs
              </button>
            </form>

            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCost;

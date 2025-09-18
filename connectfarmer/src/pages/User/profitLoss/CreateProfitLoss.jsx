import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

function CreateProfitLoss() {
  const [formData, setFormData] = useState({
    subcategoryId: "",
    sellingPrice: "",
  });
  const [subcategories, setSubcategories] = useState([]);
  const [costs, setCosts] = useState([]);
  const [selectedCost, setSelectedCost] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // ✅ Fetch all subcategories and costs for this farmer
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/subcategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));

      fetch(`http://localhost:5000/farmingcost?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setCosts(data));
    }
  }, [userId]);

  // ✅ When farmer selects a crop, auto calculate total cost
  const handleCropChange = (e) => {
    const subId = e.target.value;
    setFormData({ ...formData, subcategoryId: subId });

    // filter all cost records of that crop
    const cropCosts = costs.filter((c) => c.subcategoryId === subId);
    const total = cropCosts.reduce((sum, c) => sum + (parseInt(c.totalCost) || 0), 0);
    setSelectedCost(total);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Auto calculate Profit/Loss
  const calculateProfitLoss = () => {
    const selling = parseInt(formData.sellingPrice) || 0;
    return selling - selectedCost;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subcategoryId) {
      setMessage("⚠️ Please select a crop!");
      return;
    }

    const profitOrLoss = calculateProfitLoss();

    try {
      const response = await fetch("http://localhost:5000/profitloss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          subcategoryId: formData.subcategoryId,
          totalCost: selectedCost,
          sellingPrice: parseInt(formData.sellingPrice),
          profitOrLoss,
        }),
      });

      if (response.ok) {
        setMessage("✅ Record added successfully!");
        setTimeout(() => {
          navigate("/user/profitloss");
        }, 1500);
      } else {
        setMessage("❌ Failed to add record!");
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
            Check Profit & Loss
          </h5>
          <div className="card shadow p-4 mt-3">
            <form onSubmit={handleSubmit}>
              {/* Select Crop */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Crop</label>
                <select
                  name="subcategoryId"
                  className="form-select"
                  value={formData.subcategoryId}
                  onChange={handleCropChange}
                  required
                >
                  <option value="">-- Choose Crop --</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto Filled Total Cost */}
              <div className="mb-3">
                <label className="form-label fw-bold">Total Cost (₹)</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedCost}
                  readOnly
                />
              </div>

              {/* Selling Price */}
              <div className="mb-3">
                <label className="form-label fw-bold">Selling Price (₹)</label>
                <input
                  type="number"
                  name="sellingPrice"
                  className="form-control"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Profit / Loss (Auto Calculate) */}
              <div className="mb-3">
                <label className="form-label fw-bold">Profit / Loss (₹)</label>
                <input
                  type="text"
                  className={`form-control fw-bold ${
                    calculateProfitLoss() >= 0 ? "text-success" : "text-danger"
                  }`}
                  value={calculateProfitLoss()}
                  readOnly
                />
              </div>

              <button type="submit" className="btn btn-success fw-bold">
                Save Record
              </button>
            </form>
            {message && <p className="text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfitLoss;

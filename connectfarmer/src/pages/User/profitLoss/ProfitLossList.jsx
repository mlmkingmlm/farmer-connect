import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";

function ProfitLossList() {
  const [records, setRecords] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      // ✅ fetch profit/loss records
      fetch(`http://localhost:5000/profitloss?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setRecords(data));

      // ✅ fetch subcategories (for crop names)
      fetch(`http://localhost:5000/subcategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));
    }
  }, [userId]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await fetch(`http://localhost:5000/profitloss/${id}`, { method: "DELETE" });
      setRecords(records.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <h5 className="text-center text-light bg-dark p-2 fw-bold">
            Profit & Loss Records
            <Link to="/user/profitloss/create">
              <i className="bi bi-plus float-end text-light"></i>
            </Link>
          </h5>

          <table className="table table-bordered table-striped">
            <thead>
              <tr className="text-center bg-secondary text-white">
                <th>ID</th>
                <th>Crop</th>
                <th>Total Cost (₹)</th>
                <th>Selling Price (₹)</th>
                <th>Profit / Loss (₹)</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((item) => {
                  // ✅ find crop name from subcategoryId
                  const cropName =
                    subcategories.find(
                      (sub) => sub.id === item.subcategoryId
                    )?.name || "N/A";

                  const profitOrLoss = item.sellingPrice - item.totalCost;
                  const status = profitOrLoss >= 0 ? "Profit" : "Loss";

                  return (
                    <tr key={item.id} className="text-center">
                      <td>{item.id}</td>
                      <td>{cropName}</td>
                      <td>₹{item.totalCost}</td>
                      <td>₹{item.sellingPrice}</td>
                      <td
                        className={
                          profitOrLoss >= 0 ? "text-success fw-bold" : "text-danger fw-bold"
                        }
                      >
                        ₹{profitOrLoss}
                      </td>
                      <td>{status}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProfitLossList;

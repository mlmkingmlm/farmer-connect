import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";

function CostList() {
  const [costs, setCosts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/farmingcost?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setCosts(data));

      fetch(`http://localhost:5000/subcategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));
    }
  }, [userId]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await fetch(`http://localhost:5000/farmingcost/${id}`, { method: "DELETE" });
      setCosts(costs.filter((item) => item.id !== id));
    }
  }

  const grandTotal = costs.reduce((sum, item) => sum + (parseInt(item.totalCost) || 0), 0);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <h5 className="text-center text-light bg-dark p-2 fw-bold">
            Farming Costs (Detailed)
            <Link to="/user/cost/create">
              <i className="bi bi-plus float-end text-light"></i>
            </Link>
          </h5>

          <table className="table table-bordered table-striped">
            <thead>
              <tr className="text-center bg-secondary text-white">
                <th>ID</th>
                <th>Crop</th>
                <th>Land Prep</th>
                <th>Seeds</th>
                <th>Fertilizers</th>
                <th>Irrigation</th>
                <th>Labor</th>
                <th>Machinery</th>
                <th>Misc.</th>
                <th>Total</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {costs.length > 0 ? (
                costs.map((item) => {
                  const cropName =
                    subcategories.find((sub) => sub.id === item.subcategoryId)
                      ?.name || "N/A";

                  return (
                    <tr key={item.id} className="text-center">
                      <td>{item.id}</td>
                      <td>{cropName}</td>
                      <td>₹{item.landPreparation || 0}</td>
                      <td>₹{item.seedCost || 0}</td>
                      <td>₹{item.fertilizers || 0}</td>
                      <td>₹{item.irrigation || 0}</td>
                      <td>₹{item.labor || 0}</td>
                      <td>₹{item.machinery || 0}</td>
                      <td>₹{item.miscellaneous || 0}</td>
                      <td className="fw-bold text-success">₹{item.totalCost || 0}</td>
                      <td>
                        <Link
                          to={`/user/cost/edit/${item.id}`}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </Link>
                      </td>
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
                  <td colSpan="12" className="text-center">
                    No cost records found.
                  </td>
                </tr>
              )}
            </tbody>
            {costs.length > 0 && (
              <tfoot>
                <tr className="text-center fw-bold bg-light">
                  <td colSpan="9">Grand Total</td>
                  <td className="text-success">₹{grandTotal}</td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default CostList;

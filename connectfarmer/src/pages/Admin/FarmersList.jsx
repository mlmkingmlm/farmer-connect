import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

function FarmersList() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/registration")
      .then((res) => res.json())
      .then((data) => setFarmers(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      await fetch(`http://localhost:5000/registration/${id}`, {
        method: "DELETE",
      });
      setFarmers(farmers.filter((f) => f.id !== id));
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <AdminSidebar />
        <div className="col-md-9">
          <h3 className="fw-bold mb-3 text-center bg-dark text-white p-2">
            Farmers List
          </h3>

          <table className="table table-bordered table-striped">
            <thead>
              <tr className="text-center bg-secondary text-white">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {farmers.length > 0 ? (
                farmers.map((farmer) => (
                  <tr key={farmer.id} className="text-center">
                    <td>{farmer.id}</td>
                    <td>{farmer.name}</td>
                    <td>{farmer.email}</td>
                    <td>{farmer.location}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(farmer.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No farmers registered yet.
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

export default FarmersList;

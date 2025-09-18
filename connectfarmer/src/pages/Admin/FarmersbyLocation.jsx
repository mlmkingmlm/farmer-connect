import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

function FarmersbyLocation() {
  const [farmers, setFarmers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/registration")
      .then((res) => res.json())
      .then((data) => {
        setFarmers(data);

        // unique locations nikalna
        const uniqueLocations = [...new Set(data.map((f) => f.location))];
        setLocations(uniqueLocations);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const filteredFarmers =
    selectedLocation === "All"
      ? farmers
      : farmers.filter((f) => f.location === selectedLocation);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <AdminSidebar />
        <div className="col-md-9">
          <h3 className="fw-bold mb-3 text-center bg-dark text-white p-2">
            Farmers by Location
          </h3>

          {/* Location Dropdown */}
          <div className="mb-3">
            <label className="fw-bold me-2">Select Location:</label>
            <select
              className="form-select w-25 d-inline-block"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All">All</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Farmers Table */}
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="text-center bg-secondary text-white">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.length > 0 ? (
                filteredFarmers.map((farmer) => (
                  <tr key={farmer.id} className="text-center">
                    <td>{farmer.id}</td>
                    <td>{farmer.name}</td>
                    <td>{farmer.email}</td>
                    <td>{farmer.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No farmers found for this location.
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

export default FarmersbyLocation;

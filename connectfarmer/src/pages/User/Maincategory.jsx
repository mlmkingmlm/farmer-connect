import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

function Maincategory() {
  const [maincategory, setMaincategory] = useState([]);
  const userId = localStorage.getItem("userId"); // login user ka id

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/maincategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setMaincategory(data))
        .catch((err) => console.error("Error:", err));
    }
  }, [userId]);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <h5 className="text-center text-light bg-dark p-2 fw-bold">
            Main Category
            <Link to="/user/maincategorycreate">
              <i className="bi bi-plus float-end text-light"></i>
            </Link>
          </h5>

          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {maincategory.length > 0 ? (
                maincategory.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.duration}</td>
                    <td>
                      <Link
                        to={`/user/maincategory/edit/${item.id}`}
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ✅ Delete Function
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await fetch(`http://localhost:5000/maincategory/${id}`, {
        method: "DELETE",
      });
      setMaincategory(maincategory.filter((item) => item.id !== id));
    }
  }
}

export default Maincategory;

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";

function Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [maincategories, setMaincategories] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/subcategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));

      fetch(`http://localhost:5000/maincategory?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setMaincategories(data));
    }
  }, [userId]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      await fetch(`http://localhost:5000/subcategory/${id}`, {
        method: "DELETE",
      });
      setSubcategories(subcategories.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <h5 className="text-center text-light bg-dark p-2 fw-bold">
            Sub Categories
            <Link to="/user/subcategory/create">
              <i className="bi bi-plus float-end text-light"></i>
            </Link>
          </h5>

          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Fasal Name</th>
                <th>Main Category</th>
                <th>Things Needed</th>
                <th>Insurance</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.length > 0 ? (
                subcategories.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      {
                        maincategories.find((cat) => cat.id === item.mainCategoryId)
                          ?.name || "N/A"
                      }
                    </td>
                    <td>{item.things}</td>
                    <td>{item.insurance}</td>
                    <td>
                      <Link
                        to={`/user/subcategory/edit/${item.id}`}
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
                  <td colSpan="7" className="text-center">
                    No subcategories found.
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

export default Subcategory;

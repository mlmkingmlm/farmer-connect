import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  useEffect(() => {
  const checkLogin = () => {
    const userId = localStorage.getItem("userId");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(!!userId || adminFlag);
    setIsAdmin(adminFlag);
  };

  checkLogin();
  window.addEventListener("storage", checkLogin);

  return () => {
    window.removeEventListener("storage", checkLogin);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🌾 FarmerConnect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {isLoggedIn && !isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to={`/user/dashboard/${id}`}>
                  Dashboard
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
          {!isLoggedIn && !isAdmin && (
            <>
              <Link to="/login" className="btn btn-outline-success ms-1">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-success ms-2">
                Register
              </Link>
            </>
          )}
          {(isLoggedIn || isAdmin) && (
            <button
              className="btn btn-outline-danger ms-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

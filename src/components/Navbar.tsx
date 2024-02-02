import React from "react";
import { logout } from "../services/user-service";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <img
          src="../../public/images/WatchIt!.png"
          alt="Logo"
          width="35"
          height="35"
          className="mx-2"
        />
        <Link to="/home" className="navbar-brand">
          WatchIt!
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/home"
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className={`nav-link ${
                  location.pathname === "/search" ? "active" : ""
                }`}
              >
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={`nav-link ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/myreviews"
                className={`nav-link ${
                  location.pathname === "/myreviews" ? "active" : ""
                }`}
              >
                My Reviews
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-danger nav-item ms-lg-2 mt-3 mt-lg-0"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

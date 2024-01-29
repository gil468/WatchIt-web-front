import React from "react";
import { logout } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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
          src="../images/WatchIt!.png"
          alt="Logo"
          width="35"
          height="35"
          className="mx-2"
        />
        <a className="navbar-brand" href="home">
          WatchIt!
        </a>
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
              <a className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} aria-current="page" href="home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`} href="search">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} href="profile">
                My Profile
              </a>
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

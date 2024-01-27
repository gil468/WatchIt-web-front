import React from "react";
import { logout } from "../services/user-service";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

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
        <a className="navbar-brand" href="/">
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Upload
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Profile
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Movie title.."
                aria-label="Movie title.."
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </form>

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

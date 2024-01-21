import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar: React.FC = () => {
  return (
    <div style={{ padding: "30px" }}>
      <nav
        className="navbar fixed-top navbar-expand-lg"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="../images/WatchIt!.png"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <span style={{ paddingLeft: "5px" }}>WatchIt!</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Watchlist
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Upload
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Profile
                </a>
              </li>
            </ul>
            <div className="container-fluid">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

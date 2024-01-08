// src/Login.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(email, password);
  };

  const componentStyle = {
    backgroundColor: "#e0e0e0", // Set your desired background color
    padding: "20px", // Add additional styles as needed
  };

  return (
    <div className="container mt-5" style={componentStyle}>
      <center>
        <h1>Login</h1>
      </center>
      <form className="row g-3 needs-validation">
        <div className="mb-3">
          <label htmlFor="validationTooltip01" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className="form-control"
            id="validationTooltip01"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="mb-3">
          <label htmlFor="validationTooltip02" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            id="validationTooltip02"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
      <center>
        <a href="#">Forgot password?</a>
      </center>
      <hr></hr>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          <img
            src="./assets/Apple-Logo.png"
            className="me-2"
            style={{ width: "50px", height: "50px" }}
          />
          Sign in with Apple
        </button>
      </div>
      <center>
        <a href="#">Don't have an account yet?</a>
      </center>
    </div>
  );
};

export default Login;

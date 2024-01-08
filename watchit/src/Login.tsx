// src/Login.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    setIsEmailValid(isValidEmailFormat(inputValue));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    setIsPasswordValid(isValidPasswordFormat(inputValue));
  };

  const isValidEmailFormat = (email: string) => {
    return email.includes("@" && ".com"); //ADD: && check that the email is in the DB
  };

  const isValidPasswordFormat = (password: string) => {
    return password.length > 6; //ADD: && check that the password is in the DB
  };

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
          <label htmlFor="Email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className={`form-control ${
              isEmailValid ? "is-valid" : "is-invalid"
            }`}
            id="Email"
            value={email}
            placeholder="Email"
            required
            onChange={handleEmailChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid Email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className={`form-control ${
              isPasswordValid ? "is-valid" : "is-invalid"
            }`}
            value={password}
            id="Password"
            placeholder="Password"
            required
            onChange={handlePasswordChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Password.
          </div>
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

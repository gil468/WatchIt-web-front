// src/Login.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

interface LoginProps {
  onRegister: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmpassword: string
  ) => void;
}

const Register: React.FC<LoginProps> = ({ onRegister }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [isFirstNameValid, setIsFirstName] = useState(false);
  const [isLastNameValid, setIsLastName] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFirstName(inputValue);
    setIsFirstName(isValidNameFormat(inputValue));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLastName(inputValue);
    setIsLastName(isValidNameFormat(inputValue));
  };

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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    setIsConfirmPasswordValid(isValidConfirmPasswordFormat(inputValue));
  };

  const isValidNameFormat = (name: string) => {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    return alphabeticRegex.test(name);
  };

  const isValidEmailFormat = (email: string) => {
    return email.includes("@" && ".com");
  };

  const isValidPasswordFormat = (password: string) => {
    return password.length > 6;
  };

  const isValidConfirmPasswordFormat = (confirmPassword: string) => {
    return confirmPassword == password;
  };

  const handleRegister = () => {
    onRegister(firstname, lastname, email, password, confirmpassword);
  };

  const componentStyle = {
    backgroundColor: "#e0e0e0", // Set your desired background color
    padding: "20px", // Add additional styles as needed
  };

  return (
    <div className="container mt-5" style={componentStyle}>
      <center>
        <h1>Register</h1>
      </center>
      <form className="row g-3 needs-validation">
        <div className="mb-3">
          <label htmlFor="validationCustom01" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className={`form-control ${
              isFirstNameValid ? "is-valid" : "is-invalid"
            }`}
            id="validationCustom01"
            value={firstname}
            placeholder="First Name"
            required
            onChange={handleFirstNameChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid First Name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="validationCustom01" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className={`form-control ${
              isLastNameValid ? "is-valid" : "is-invalid"
            }`}
            id="validationCustom01"
            value={lastname}
            placeholder="Last Name"
            required
            onChange={handleLastNameChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Last Name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="validationCustom01" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className={`form-control ${
              isEmailValid ? "is-valid" : "is-invalid"
            }`}
            id="validationCustom01"
            value={email}
            placeholder="Email"
            required
            onChange={handleEmailChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid Email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="validationTooltip02" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className={`form-control ${
              isPasswordValid ? "is-valid" : "is-invalid"
            }`}
            value={password}
            id="validationTooltip02"
            placeholder="Password"
            required
            onChange={handlePasswordChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Password.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="validationTooltip02" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className={`form-control ${
              isConfirmPasswordValid ? "is-valid" : "is-invalid"
            }`}
            value={confirmpassword}
            id="validationTooltip02"
            placeholder="Confirm Password"
            required
            onChange={handleConfirmPasswordChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Confirm Password.
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleRegister}
          >
            Sign up
          </button>
        </div>
      </form>
      <hr></hr>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          <img
            src="./assets/Apple-Logo.png"
            className="me-2"
            style={{ width: "50px", height: "50px" }}
          />
          Sign up with Apple
        </button>
      </div>
      <center>
        <a href="#">Already have an account?</a>
      </center>
    </div>
  );
};

export default Register;

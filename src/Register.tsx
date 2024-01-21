// src/Login.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

interface RegisterProps {
}

const onRegister = (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmpassword: string
) => {
  console.log("Registerd with:", {
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
  });
};

const Register: React.FC<RegisterProps> = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [profileimage, setProfileImage] = useState<File>();

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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    setIsConfirmPasswordValid(isValidConfirmPasswordFormat(inputValue));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.files?.[0];
    setProfileImage(inputValue);
  };

  const isValidNameFormat = (name: string) => {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    return alphabeticRegex.test(name);
  };

  const isValidEmailFormat = (email: string) => {
    return email.includes("@" && ".com");
  };

  const isValidPasswordFormat = (password: string) => {
    return password.length > 5;
  };

  const isValidConfirmPasswordFormat = (confirmPassword: string) => {
    return confirmPassword == password;
  };

  const handleRegister = () => {
    onRegister(
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
      profileimage
    );
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
          <label htmlFor="FirstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className={`form-control ${
              firstname === ""
                ? ""
                : isFirstNameValid
                ? "is-valid"
                : "is-invalid"
            }`}
            id="FirstName"
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
          <label htmlFor="LastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className={`form-control ${
              lastname === "" ? "" : isLastNameValid ? "is-valid" : "is-invalid"
            }`}
            id="LastName"
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
          <label htmlFor="Email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            className={`form-control ${
              email === "" ? "" : isEmailValid ? "is-valid" : "is-invalid"
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
              password === "" ? "" : isPasswordValid ? "is-valid" : "is-invalid"
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
        <div className="mb-3">
          <label htmlFor="ConfirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className={`form-control ${
              confirmpassword === ""
                ? ""
                : isConfirmPasswordValid
                ? "is-valid"
                : "is-invalid"
            }`}
            value={confirmpassword}
            id="ConfirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleConfirmPasswordChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Please provide a valid Confirm Password.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">
            Profile Picture:
          </label>
          <input
            className={`form-control ${
              profileimage == undefined ? "" : "is-valid"
            }`}
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleProfileImageChange}
            required
          />
          <div className="invalid-feedback">
            Please provide a valid Profie Picture.
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
            src="../images/apple.png"
            className="me-2"
            width="40"
            height="40"
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

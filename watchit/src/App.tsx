import './App.css'
// src/App.tsx
import React from 'react';
// import Login from './Login';
// import Register from './Register';
import Home from './Home'
import ReviewCard from './ReviewCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  // const handleLogin = (email: string, password: string) => {
  //   console.log('Logged in with:', { email, password });
  // };

  //   const handleRegister = (firstname: string, lastname: string, email: string, password: string, confirmpassword: string) => {
  //   console.log('Registerd with:', { firstname, lastname, email, password, confirmpassword });
  // };

  return (
    <div className="container">
      <Home/>
      <ReviewCard/>
      {/* <Login onLogin={handleLogin} />
      <Register onRegister={handleRegister}/> */}
    </div>
  );
};

export default App;

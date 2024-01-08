import './App.css'
// src/App.tsx
import React from 'react';
import Login from './login';
// import Register from './Register';

const App: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Logged in with:', { email, password });
  };

  //   const handleRegister = (firstname: string, lastname: string, email: string, password: string, confirmpassword: string) => {
  //   console.log('Registerd with:', { firstname, lastname, email, password, confirmpassword });
  // };

  return (
    <div className="container">
      <Login onLogin={handleLogin} />
      {/* <Register onRegister={handleRegister}/> */}
    </div>
  );
};

export default App;

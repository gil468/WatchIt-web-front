import React from "react";
import Navbar from "./Navbar";
import EditProfile from "./auth/EditProfile";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <EditProfile />
    </>
  );
};

export default Home;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PhothosCarousel from "./PhotosCarousel";
import Navbar from "./Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <PhothosCarousel></PhothosCarousel>
    </>
  );
};

export default Home;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import ReviewCard from "./ReviewCard";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      {Array.from({ length: 16 }, (_) => (
        <ReviewCard />
      ))}
    </>
  );
};

export default Home;

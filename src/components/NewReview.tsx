import React from "react";
import Navbar from "./Navbar";
import NewReviewForm from "./auth/NewReviewForm";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <NewReviewForm />
    </>
  );
};

export default Home;

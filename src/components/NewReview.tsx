import React from "react";
import Navbar from "./Navbar";
import NewReviewForm from "../components/NewReviewForm";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <NewReviewForm />
    </>
  );
};

export default Home;

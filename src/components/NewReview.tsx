import React from "react";
import Navbar from "./Navbar";
import NewReviewForm from "../components/NewReviewForm";
import { useLocation } from "react-router-dom";

const NewReview: React.FC = () => {
  const location = useLocation();
  const { id, poster_path, title } = location.state;

  return (
    <>
      <Navbar />
      <NewReviewForm movieId={id} movieTitle={title} />
    </>
  );
};

export default NewReview;

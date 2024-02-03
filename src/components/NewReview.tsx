import React from "react";
import Navbar from "./Navbar";
import NewReviewForm from "../components/NewReviewForm";
import { useLocation } from 'react-router-dom';


const NewReview: React.FC = () => {
  const location = useLocation();
  const { movie_id, title } = location.state;

  return (
    <>
      <Navbar />
      <NewReviewForm movieId={movie_id} movieTitle={title} />
    </>
  );
};

export default NewReview;

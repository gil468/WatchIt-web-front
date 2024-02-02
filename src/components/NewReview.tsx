import React from "react";
import Navbar from "./Navbar";
import NewReviewForm from "../components/NewReviewForm";
import { useLocation } from 'react-router-dom';


const NewReview: React.FC = () => {
  const location = useLocation();
  const { movie_id, title, poster_path } = location.state;

  return (
    <>
      <Navbar />
      <NewReviewForm movie_id={movie_id} movie_title={title} poster_path={poster_path} />
    </>
  );
};

export default NewReview;

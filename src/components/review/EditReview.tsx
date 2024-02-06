import React from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";
import EditReviewForm from "./EditReviewForm";

const EditReview: React.FC = () => {
  const location = useLocation();
  const { reviewId, reviewScore, reviewImageUrl, reviewText } = location.state;

  return (
    <>
      <Navbar />
      <EditReviewForm
        reviewId={reviewId}
        reviewScore={reviewScore}
        reviewImageUrl={reviewImageUrl}
        reviewText={reviewText}
      />
    </>
  );
};

export default EditReview;

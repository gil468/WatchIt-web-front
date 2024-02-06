import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ReviewCard from "./ReviewCard";
import {
  Review,
  getAllReviews,
  likeReview,
  unlikeReview,
} from "../services/review-service";

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getAllReviews();
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewLike = async (reviewId: string) => {
    await likeReview(reviewId);
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          isLiked: true,
          likesCount: review.likesCount + 1,
        };
      }
      return review;
    });
    setReviews(updatedReviews);
  };

  const handleReviewUnlike = async (reviewId: string) => {
    await unlikeReview(reviewId);
    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          isLiked: false,
          likesCount: review.likesCount - 1,
        };
      }
      return review;
    });
    setReviews(updatedReviews);
  };

  return (
    <>
      <Navbar />
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          {...review}
          showLikesAndComments={true}
          likeReview={() => handleReviewLike(review.id)}
          unlikeReview={() => handleReviewUnlike(review.id)}
        />
      ))}
    </>
  );
};

export default Home;

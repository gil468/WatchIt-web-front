import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ReviewCard from "./ReviewCard";
import { IReview, getAllReviews } from "../services/review-service";

const Home: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

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

  return (
    <>
      <Navbar />
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          {...review}
          userFullName={review.author?.fullName!}
          userImgUrl={review.author?.imgUrl!}
        />
      ))}
      {/* {Array.from({ length: 16 }, (_, id) => (
        <ReviewCard
          key={id}
          reviewId={0}
          commentsCount={40}
          isLiked={false}
          likeCount={45}
          postedOn={new Date()}
          reviewScore={4}
          reviewImageUrl="https://generated.vusercontent.net/placeholder.svg"
          reviewText="The best movie EVER!!!!!"
          reviewerName="Oren Eyal"
          reviewerProfilePictureUrl="https://generated.vusercontent.net/placeholder.svg"
          likeReview={() => {}}
          commentOnReview={() => {}}
        />
      ))} */}
    </>
  );
};

export default Home;

import React from "react";
import Navbar from "./Navbar";
import MyReviewCard from "./MyReviewCard";

const MyReviews: React.FC = () => {
    return (
      <>
        <Navbar />
        {Array.from({ length: 16 }, (_, id) => (
          <MyReviewCard
            key={id}
            reviewId={0}
            postedOn={new Date()}
            reviewScore={4}
            reviewImageUrl="https://generated.vusercontent.net/placeholder.svg"
            reviewText="The best movie EVER!!!!!"
            reviewerName="Oren Eyal"
            reviewerProfilePictureUrl="https://generated.vusercontent.net/placeholder.svg"
            editReview={() => {}}
            deleteReview={() => {}}
          />
        ))}
      </>
    );
  };
  
  export default MyReviews;
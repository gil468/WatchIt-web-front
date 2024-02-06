import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Review, getReviewById } from "../../services/review-service";
import ReviewCard from "../review/ReviewCard";

export interface IComment {
  _id?: string;
  description: string;
  owner: string;
  reviewId: string;
  timeStamp: Date;
  userFullName: string;
  userImgUrl: string;
}

const Comments: React.FC = () => {
  const [review, setReview] = useState<Review | null>(null);

  const { reviewId } = useParams<{ reviewId: string }>();

  const fetchReview = async () => {
    try {
      if (reviewId !== undefined) {
        const review = await getReviewById(reviewId);
        setReview(review);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <Navbar />
      {review && <ReviewCard {...review} showLikesAndComments={false} />}
      <p className="h3 text-center mt-0">Comments</p>
      <CommentForm
        reviewId={reviewId}
        postCommentCallback={() => fetchReview()}
      />
      <div className="mt-2">
        {review?.comments
          .sort(
            (a, b) =>
              new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          )
          .map((comment, index) => (
            <CommentCard key={index} {...comment} />
          ))}
      </div>
    </>
  );
};

export default Comments;

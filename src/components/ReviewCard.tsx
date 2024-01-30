import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface ReviewCardProps {
  reviewId: number;
  reviewerName: string;
  reviewerProfilePictureUrl: string;
  postedOn: Date;
  reviewScore: 1 | 2 | 3 | 4 | 5;
  reviewImageUrl: string;
  reviewText: string;
  likeCount: number;
  commentsCount: number;
  isLiked: boolean;
  likeReview(): void;
  commentOnReview(reviewId: number): void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewId,
  reviewerName,
  reviewerProfilePictureUrl,
  postedOn,
  reviewScore,
  reviewImageUrl,
  reviewText,
  likeCount,
  commentsCount,
  isLiked,
  likeReview,
  commentOnReview,
}) => {
  const navigate = useNavigate();

  const handleCommentClick = () => {
    // Call the commentOnReview function passing the reviewId
    commentOnReview(reviewId);

    // Navigate to the "/comments/{reviewId}" route
    navigate(`/comments/${reviewId}`);
  };

  return (
    <div className="card w-50 mx-auto my-3 px-4 py-3">
      <div className="container px-0">
        <div className="d-flex justify-content-between align-items-center ms-0">
          <div className="d-flex align-items-center ms-0">
            <img
              alt="Reviewer Avatar"
              className="rounded-circle ms-0 me-2"
              height="50"
              width="50"
              src={reviewerProfilePictureUrl}
            />

            <p className="h5 my-0">{reviewerName}</p>
          </div>
          <small className="my-0 text-muted">
            {`${postedOn.toLocaleDateString()} ${postedOn.toLocaleTimeString()}`}
          </small>
        </div>
      </div>
      <img
        src={reviewImageUrl}
        className="card-img-top mt-2"
        height="200"
        style={{ backgroundColor: "#e3f2fd" }}
      />
      <div className="card-body ps-0">
        <span className="fw-bold me-2">Score:</span>
        {Array.from({ length: reviewScore }, (_) => (
          <i className="bi bi-star-fill me-1" style={{ color: "#ecc94b" }} />
        ))}

        {Array.from({ length: 5 - reviewScore }, (_) => (
          <i className="bi bi-star me-1" style={{ color: "#ecc94b" }} />
        ))}

        <p className="card-text mt-2">{reviewText}</p>
      </div>
      <div className="text-center py-3">
        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className={`btn ${(isLiked && "btn-dark") || "btn-outline-dark"}`}
            onClick={likeReview}
          >
            <i className="bi bi-heart me-2 align-middle"></i>
            Like
            <div className="vr mx-2 align-middle"></div>
            {likeCount}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleCommentClick}
          >
            <i className="bi bi-chat me-2 align-middle"></i>
            Comment
            <div className="vr mx-2 align-middle"></div>
            {commentsCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

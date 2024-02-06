import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import { Review } from "../../services/review-service";
import LikeAndCommentReview from "./LikeAndCommentReview";

interface ReviewCardProps extends Review {
  likeReview?: () => void;
  unlikeReview?: () => void;
  showLikesAndComments: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  movieTitle,
  description,
  score,
  reviewImgUrl,
  timeStamp,
  author,
  likes,
  comments,
  isLiked,
  showLikesAndComments,
  likeReview,
  unlikeReview,
}) => {
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(`/comments/${id}`);
  };

  const handleLikeClick = () => {
    isLiked ? unlikeReview!() : likeReview!();
  };

  return (
    <div className="card w-50 mx-auto my-3 px-4 py-3">
      <div className="container px-0">
        <div className="d-flex justify-content-between align-items-center ms-0">
          <div className="d-flex align-items-center ms-0">
            <img
              alt="User Avatar"
              className="rounded-circle ms-0 me-2"
              height="50"
              width="50"
              src={author?.imgUrl}
            />

            <p className="h5 my-0">{author?.fullName}</p>
          </div>
          <small className="my-0 text-muted">
            {`${format(new Date(timeStamp || 0), "dd/MM/yyyy HH:mm:ss")}`}
          </small>
        </div>
      </div>
      <img
        src={reviewImgUrl}
        className="card-img-top mt-2"
        height="200"
        style={{ backgroundColor: "#e3f2fd" }}
      />
      <div className="card-body ps-0">
        <p className="h5 my-0">Movie Title: {movieTitle}</p>
        <span className="fw-bold me-2">Score:</span>
        {Array.from({ length: score }, (_) => (
          <i className="bi bi-star-fill me-1" style={{ color: "#ecc94b" }} />
        ))}

        {Array.from({ length: 5 - score }, (_) => (
          <i className="bi bi-star me-1" style={{ color: "#ecc94b" }} />
        ))}

        <p className="card-text mt-2 multiline">{description}</p>
      </div>
      {showLikesAndComments && (
        <LikeAndCommentReview
          isLiked={isLiked}
          handleLikeClick={handleLikeClick}
          likesCount={likes}
          handleCommentClick={handleCommentClick}
          commentsCount={comments?.length}
        />
      )}
    </div>
  );
};

export default ReviewCard;

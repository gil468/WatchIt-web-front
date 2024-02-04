import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IComment } from "./Comments";
import { format } from "date-fns";

interface ReviewCardProps {
  _id: string;
  movieTitle: string;
  description: string;
  score: number;
  reviewImgUrl: string;
  timeStamp: Date;
  owner: string;
  userFullName: string;
  userImgUrl: string;
  commentsCount: number;
  likesCount: number;
  isLiked: object[];
  comments?: IComment[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  _id,
  movieTitle,
  description,
  score,
  reviewImgUrl,
  timeStamp,
  userFullName,
  userImgUrl,
  likesCount,
  commentsCount,
  isLiked,
}) => {
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(`/comments/${_id}`);
  };

  const handleLikeClick = () => {};

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
              src={userImgUrl}
            />

            <p className="h5 my-0">{userFullName}</p>
          </div>
          <small className="my-0 text-muted">
            {`${format(new Date(timeStamp), "dd/MM/yyyy HH:mm:ss")}`}
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

        <p className="card-text mt-2">{description}</p>
      </div>
      <div className="text-center py-3">
        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className={`btn ${(isLiked && "btn-dark") || "btn-outline-dark"}`}
            onClick={handleLikeClick}
          >
            <i className="bi bi-heart me-2 align-middle"></i>
            Like
            <div className="vr mx-2 align-middle"></div>
            {likesCount || 0}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleCommentClick}
          >
            <i className="bi bi-chat me-2 align-middle"></i>
            Comment
            <div className="vr mx-2 align-middle"></div>
            {commentsCount || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

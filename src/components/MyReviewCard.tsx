import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface MyReviewCardProps {
  reviewId: number;
  reviewerName: string;
  reviewerProfilePictureUrl: string;
  postedOn: Date;
  reviewScore: 1 | 2 | 3 | 4 | 5;
  reviewImageUrl: string;
  reviewText: string;
  editReview(reviewId: number): void;
  deleteReview(reviewId: number): void;
}

const MyReviewCard: React.FC<MyReviewCardProps> = ({
  reviewId,
  reviewerName,
  reviewerProfilePictureUrl,
  postedOn,
  reviewScore,
  reviewImageUrl,
  reviewText,
  editReview,
  deleteReview,
}) => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    // Call the commentOnReview function passing the reviewId
    deleteReview(reviewId);
  };

  const handleEditClick = () => {
    // Call the commentOnReview function passing the reviewId
    editReview(reviewId);

    navigate(`/edit/review/${reviewId}`);
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
            className={"btn btn-outline-dark"}
            onClick={handleEditClick}
          >
            <i className="bi bi-pencil me-2 align-middle"></i>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-trash me-2 align-middle"></i>
            Delete
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Delete Review
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure that you want to delete this review?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;

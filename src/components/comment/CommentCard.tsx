import React from "react";
import { format } from "date-fns";
import { Comment } from "../../services/comment-service";

interface CommentCardProps extends Comment {}

const CommentCard: React.FC<CommentCardProps> = ({
  timeStamp,
  description,
  author,
}) => {
  console.log(author);
  return (
    <div className="w-50 mx-auto p-3 card border mb-3">
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
      <p className="card-text card-body mb-0 pb-0 multiline">{description}</p>
    </div>
  );
};

export default CommentCard;

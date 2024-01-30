import React from "react";

interface CommentCardProps {
  userName: string;
  description: string;
  timestamp: string;
//   profileImgUrl: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  userName,
  description,
  timestamp,
//   profileImgUrl,
}) => {
  return (
    <div className="col">
      <div className="card border-dark mb-3" >
        <div className="row g-0">
          <div className="col-md-1">
            {/* <img
              src={profileImgUrl}
              className="img-fluid rounded-start"
            /> */}
            <img
              src="../src/assets/react.svg"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{userName}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary">{timestamp}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

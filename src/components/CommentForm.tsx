import React, { useState } from "react";

interface CommentFormProps {
  postComment: (comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postComment }) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (comment.trim() !== "") {
      postComment(comment);
      setComment("");
    }
  };

  return (
    <div className="d-flex align-items-center ms-0 ">
      <div className="p-2 col-4">
        <input
          className="form-control border-dark"
          type="text"
          value={comment}
          onChange={handleInputChange}
          placeholder="Enter your comment..."
          aria-label="default input example"
        />
      </div>
      <div className="p-2 g-col-6">
        <button className="btn btn-outline-dark" onClick={handlePostComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentForm;

import React, { useState } from "react";
import { IComment, createComment } from "../services/comment-service";

interface CommentFormProps {
  reviewId?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ reviewId }) => {
  const [comment, setComment] = useState<IComment>({
    description: "",
    owner: "", // To do: to figure out how to get cureent user id
    reviewId: reviewId || "",
    timeStamp: new Date(),
    userFullName: "", // To do: to figure out how to get cureent user id
    userImgUrl: "", // To do: to figure out how to get cureent user id
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment((prevComment) => ({
      ...prevComment,
      description: e.target.value,
    }));
  };

  const handleCommentSubmit = async () => {
    if (comment.description.trim() !== "") {
      try {
        await createComment(comment);
      } catch (err) {
        console.log(err);
      }
      setComment({
        description: "",
        owner: "",
        reviewId: "",
        timeStamp: new Date(),
        userFullName: "",
        userImgUrl: "",
      });
    }
  };

  return (
    <div className="d-flex align-items-center ms-0 ">
      <p className="h4 col-3">Write a comment: </p>
      <div className="p-2 col-4">
        <input
          className="form-control border-dark"
          type="text"
          value={comment.description}
          onChange={handleInputChange}
          placeholder="Enter your comment..."
          aria-label="default input example"
        />
      </div>
      <div className="p-2 g-col-6">
        <button className="btn btn-outline-dark" onClick={handleCommentSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentForm;

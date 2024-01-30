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
      setComment(""); // Clear the input field after posting the comment
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

  //   return (
  //     <div className="container text-center">
  //       <div className="row">
  //         <div className="col-10">
  //           <input
  //             className="form-control border-dark"
  //             type="text"
  //             value={comment}
  //             onChange={handleInputChange}
  //             placeholder="Enter your comment..."
  //             aria-label="default input example"
  //           />
  //         </div>
  //         <div className="col-1">
  //           <button onClick={handlePostComment}>Post</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default CommentForm;

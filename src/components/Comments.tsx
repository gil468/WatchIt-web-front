import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import CommentCard from "./CommentCard";
import { getComments } from "../services/comment-service";
import ReviewCard from "./ReviewCard";
import CommentForm from "./CommentForm";

// interface CommentsProps {
//   reviewId: number;
// }

interface Comment {
  userId: number;
  reviewId: number;
  userName: string;
  description: string;
  timestamp: Date;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { reviewId } = useParams<{ reviewId?: string }>();

  const postComment = (comment: string) => {
    // Your logic to post the comment (e.g., make an API call)
    console.log(`Posting comment: ${comment}`);
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (reviewId !== null) {
          const commentsResult = await getComments(Number(reviewId));
          setComments(commentsResult);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (!dataLoaded) {
      fetchComments();
    }
  }, [reviewId, dataLoaded]);

  return (
    <>
      <Navbar />
      <ReviewCard
          reviewId={Number(reviewId)}
          commentsCount={40}
          isLiked={false}
          likeCount={45}
          postedOn={new Date()}
          reviewScore={4}
          reviewImageUrl="https://generated.vusercontent.net/placeholder.svg"
          reviewText="The best movie EVER!!!!!"
          reviewerName="Oren Eyal"
          reviewerProfilePictureUrl="https://generated.vusercontent.net/placeholder.svg"
          likeReview={() => {}}
          commentOnReview={() => {}}
        />
      <div
        className="row row-cols-1 row-cols"
        style={{
          paddingTop: "10px",
          paddingRight: "50px",
          paddingLeft: "50px",
        }}
      >
        <CommentForm postComment={postComment} />
        <p className="h2" style={{paddingTop: "30px"}}>Comments</p>
        {/* {comments.map((comment, index) => (
          <CommentCard key={index} {...comment} />
        ))} */}
        <CommentCard userName={"Gil Segev"} description={"Very good movie!!!"} timestamp={"30.1.2024 14:29:34"}/>
        <CommentCard userName={"Gil Segev"} description={"Very good movie!!!"} timestamp={"30.1.2024 14:29:34"}/>
        <CommentCard userName={"Gil Segev"} description={"Very good movie!!!"} timestamp={"30.1.2024 14:29:34"}/>

      </div>
    </>
  );
};

export default Comments;

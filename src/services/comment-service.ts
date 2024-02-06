import apiClient from "./api-client";

export interface Comment {
  id: string;
  description: string;
  author: {
    fullName: string;
    imgUrl: string;
  };
  timeStamp: Date;
  reviewId: string;
}

export const getCommentsByReviewId = (review_id: string) => {
  return new Promise<Comment[]>((resolve, reject) => {
    apiClient
      .get(`/comments/review/${review_id}`)
      .then((response) => {
        const comments = (response.data as Comment[]).sort((a, b) => {
          return (
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          );
        });

        resolve(comments);
      })
      .catch((error) => {
        console.log("error in getting all comments of review: ", error);
        reject(error);
      });
  });
};

export const createComment = (
  comment: Pick<Comment, "description" | "reviewId">
) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating comment...");
    console.log(comment);
    apiClient
      .post(`/comments/`, comment)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

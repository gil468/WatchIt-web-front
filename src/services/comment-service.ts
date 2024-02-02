import apiClient from "./api-client";

export interface IComment {
  _id?: string;
  description: string;
  owner: string;
  reviewId: string;
  timeStamp: Date;
  userFullName: string;
  userImgUrl: string;
}

export const getCommentsByReviewId = (review_id: string) => {
  return new Promise<IComment[]>((resolve, reject) => {
    apiClient
      .get(`/comments/review/${review_id}`)
      .then((response) => {
        const comments = (response.data as IComment[]).sort((a, b) => {
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

export const createComment = (comment: IComment) => {
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

import apiClient from "./api-client";

export interface Comment {
  userId: number;
  reviewId: number;
  userName: string;
  description: string;
  timestamp: Date;
  // profileImgUrl: string;
}

export const getComments = (review_id: number) => {
  return new Promise<Comment[]>((resolve, reject) => {
    apiClient
      .get(`/comments/${review_id}`)
      .then((response) => {
        const comments = (response.data as Comment[]).sort((a, b) => {
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        });

        resolve(comments);
      })
      .catch((error) => {
        console.log("error movies", error);
        reject(error);
      });
  });
};

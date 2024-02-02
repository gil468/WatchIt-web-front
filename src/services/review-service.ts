import apiClient from "./api-client";
import { IComment } from "./comment-service";

export interface IReview {
  _id?: string;
  movieTitle: string;
  description: string;
  score: number;
  reviewImgUrl: string;
  timeStamp: Date;
  owner: string;
  userFullName: string;
  userImgUrl: string;
  commentsCount: number;
  likesCount: number;
  isLiked: object[];
  comments?: IComment[];
}

export const getAllReviews = () => {
  return new Promise<IReview[]>((resolve, reject) => {
    apiClient
      .get(`/reviews/`)
      .then((response) => {
        const reviews = (response.data as IReview[]).sort((a, b) => {
          return (
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          );
        });
        resolve(reviews);
      })
      .catch((error) => {
        console.log("error in getting all reviews: ", error);
        reject(error);
      });
  });
};

export const getReviewById = (review_id: string) => {
  return new Promise<IReview[]>((resolve, reject) => {
    apiClient
      .get(`/reviews/${review_id}`)
      .then((response) => {
        const reviews = (response.data as IReview[]);
        resolve(reviews);
      })
      .catch((error) => {
        console.log("error in getting specific review: ", error);
        reject(error);
      });
  });
};

export const getReviewsByUserId = (user_id: string) => {
  return new Promise<IReview[]>((resolve, reject) => {
    apiClient
      .get(`/reviews/user/${user_id}`)
      .then((response) => {
        const reviews = (response.data as IReview[]).sort((a, b) => {
          return (
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          );
        });

        resolve(reviews);
      })
      .catch((error) => {
        console.log("error in getting all reviews of specific user: ", error);
        reject(error);
      });
  });
};

export const createReview = (review: IReview) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating review...");
    console.log(review);
    apiClient
      .post("/reviews/", review)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const editReview = (review: IReview) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Updating review...");
    console.log(review);
    apiClient
      .put(`/reviews/${review._id}`, review)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteReview = (review: IReview) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Deleting user...");
    console.log(review);
    apiClient
      .delete(`/reviews/${review._id}`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

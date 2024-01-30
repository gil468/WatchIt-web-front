import { CodeResponse, CredentialResponse } from "@react-oauth/google";
import apiClient, {
  refreshTokenApiClient,
  unauthorizedApiClient,
} from "./api-client";

export interface IReview {
  description: string;
  score: number;
  imgUrl: string;
  movieId?: string;
  _id?: string;
}

export const createReview = (review: IReview) => {
    // return new Promise<void>((resolve, reject) => {
    //   console.log("Registering user...");
    //   console.log(user);
    //   apiClient
    //     .post("/auth/register", user)
    //     .then((response) => {
    //       const { accessToken, refreshToken } = response.data;
    //       localStorage.setItem("access_token", accessToken!);
    //       localStorage.setItem("refresh_token", refreshToken!);
    //       resolve();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       reject(error);
    //     });
    // });
  };
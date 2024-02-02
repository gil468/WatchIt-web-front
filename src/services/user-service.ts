import { CodeResponse, CredentialResponse } from "@react-oauth/google";
import apiClient, {
  refreshTokenApiClient,
  unauthorizedApiClient,
} from "./api-client";

export interface IUser {
  fullName?: string;
  email: string;
  password?: string;
  imgUrl?: string;
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const register = (user: IUser) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Registering user...");
    console.log(user);
    apiClient
      .post("/auth/register", user)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const login = (user: IUser) => {
  return new Promise<void>((resolve, reject) => {
    console.log("user singing in...");
    console.log(user);
    unauthorizedApiClient
      .post("/auth/login", user)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("access_token", accessToken!);
        localStorage.setItem("refresh_token", refreshToken!);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const logout = () => {
  return new Promise<void>((resolve, reject) => {
    refreshTokenApiClient
      .get("/auth/logout")
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const refresh = () => {
  return new Promise<void>((resolve, reject) => {
    apiClient
      .get("/auth/refresh")
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("access_token", accessToken!);
        localStorage.setItem("refresh_token", refreshToken!);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const googleSignin = (credentialResponse: CodeResponse) => {
  return new Promise<void>((resolve, reject) => {
    console.log("googleSignin ...", credentialResponse);
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("access_token", accessToken!);
        localStorage.setItem("refresh_token", refreshToken!);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const googleSignin2 = (credentialResponse: CredentialResponse) => {
  return new Promise<void>((resolve, reject) => {
    console.log("googleSignin ...", credentialResponse);
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("access_token", accessToken!);
        localStorage.setItem("refresh_token", refreshToken!);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

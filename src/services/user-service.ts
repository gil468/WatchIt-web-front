import { CodeResponse } from "@react-oauth/google";
import apiClient from "./api-client";

export interface IUser {
  fullName?: string;
  email: string;
  password?: string;
  imgUrl?: string;
  _id?: string;
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
    apiClient
      .post("/auth/login", user)
      .then(() => {
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
    apiClient
      .get("/auth/logout")
      .then(() => {
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
      .then(() => {
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
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

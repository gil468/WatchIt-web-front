import axios, { CanceledError } from "axios";

export { CanceledError };

const baseURL = "http://localhost:3000";

export const refreshTokenApiClient = axios.create({
  baseURL: baseURL,
});

refreshTokenApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("refresh_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiClient = axios.create({
  baseURL: baseURL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshTokenApiClient.get("/auth/refresh");
        const newTokens = response.data;

        localStorage.setItem("access_token", newTokens.accessToken);
        localStorage.setItem("refresh_token", newTokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.log("error", error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

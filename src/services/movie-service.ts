import apiClient from "./api-client";

export interface MovieResponse {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
}

export const searchMovie = (searchTerm: string) => {
  return new Promise<MovieResponse>((resolve, reject) => {
    apiClient
      .get(`/movies/search/${searchTerm}`)
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

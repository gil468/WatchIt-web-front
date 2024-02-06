import apiClient from "./api-client";

export interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
}

export const searchMovie = (searchTerm: string) => {
  return new Promise<Movie[]>((resolve, reject) => {
    apiClient
      .get(`/movies/search/${searchTerm}`)
      .then((response) => {
        const movies = (response.data as Movie[])
          .filter((movie: Movie) => movie.popularity > 30)
          .sort((a, b) => b.popularity - a.popularity);

        resolve(movies);
      })
      .catch((error) => {
        console.log("error movies", error);
        reject(error);
      });
  });
};

export const getMovieById = (movieId: number) => {
  return new Promise<Movie>((resolve, reject) => {
    apiClient
      .get(`/movies/${movieId}`)
      .then((response) => {
        resolve(response.data as Movie);
      })
      .catch((error) => {
        console.log("error movie", error);
        reject(error);
      });
  });
};

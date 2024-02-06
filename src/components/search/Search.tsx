import React, { useRef, useState } from "react";
import Navbar from "../Navbar";
import SearchCardResult from "./SearchCardResult";
import { searchMovie } from "../../services/movie-service";

interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
}

const Search: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchTerm = useRef<HTMLInputElement>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = searchTerm.current?.value;

    if (term) {
      const moviesResult = await searchMovie(term);
      console.log(moviesResult);
      setMovies(moviesResult);
      setShowPlaceholder(false);
    }
  };

  return (
    <>
      <Navbar />
      <form
        className="d-flex"
        onSubmit={search}
        style={{
          paddingTop: "40px",
          paddingRight: "150px",
          paddingLeft: "150px",
        }}
      >
        <div className="input-group">
          <input
            type="text"
            ref={searchTerm}
            className="form-control"
            placeholder="Movie title..."
            aria-label="Movie title..."
            aria-describedby="button-addon2"
          />
          <button className="btn btn-dark" type="submit" id="button-addon2">
            Search
          </button>
        </div>
      </form>

      <div className="text-center" style={{ paddingTop: "40px" }}>
        {showPlaceholder && (
          <p className="h4">Please insert movie title for results</p>
        )}
      </div>

      <div
        className="row row-cols-1 row-cols-md-3 g-4 mw-100"
        style={{
          paddingTop: "10px",
          paddingRight: "50px",
          paddingLeft: "50px",
        }}
      >
        {movies.map((movie, index) => (
          <SearchCardResult key={index} {...movie} />
        ))}
      </div>
    </>
  );
};

export default Search;

import React from "react";

interface SearchCardProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const SearchCardResult: React.FC<SearchCardProps> = ({
  title,
  poster_path,
  overview,
}) => {

  const handleAddReview = () => {
    
  };
  
  return (
    <div className="col">
      <div className="card text-bg-dark h-100">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={"https://image.tmdb.org/t/p/w500" + poster_path}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{overview}</p>
              <button
                type="submit"
                className="btn btn-outline-light mx-auto d-flex justify-content-center"
                onClick={handleAddReview}
              >
                Write a review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCardResult;

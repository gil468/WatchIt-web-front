import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewCard: React.FC = () => {

  return (
    <div className="card w-50 mx-auto my-3">
      <div className="container">
        <div className="row align-items-center justify-content-start">
          <div className="col-1">
            <img
              src="../public/images/profile_pic_placeholder.png"
              height="50"
            />
          </div>
          <div className="col-2">
            <p className="h5 align-middle m-0 h-100">Gil Segev</p>
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-sm btn-outline-primary">
              Follow
            </button>
          </div>
        </div>
      </div>
      <img
        src="../public/images/WatchIt!.png"
        className="card-img-top"
        height="200"
        style={{ backgroundColor: "#e3f2fd" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p className="card-text">
          <small className="text-body-secondary">Last updated 3 mins ago</small>
        </p>
      </div>
      <div className="card-footer text-center">
        <div className="row">
          <div className="col p-4">
            <button type="button" className="btn btn-outline-primary">
              Like
            </button>
          </div>
          <div className="col p-4">
            <button type="button" className="btn btn-outline-primary">
              Comment
            </button>
          </div>
          <div className="col p-4">
            <button type="button" className="btn btn-outline-primary">
              Add To Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

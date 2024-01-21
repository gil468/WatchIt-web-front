import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewCard: React.FC = () => {
  return (
    <div className="card">
      <div className="container">
        <div className="row">
          <div className="col-1">
            <img
              src="../public/images/profile_pic_placeholder.png"
              className="p-2"
              width="80"
              height="80"
            />
          </div>
          <div className="col-2 p-4 ps-0">
            <p className="h5">Gil Segev</p>
          </div>
          <div className="col p-4 mt-3 ps-0">
            <button type="button" className="btn btn-outline-primary position-absolute top-10 start-10 translate-middle">
              Follow
            </button>
          </div>
        </div>
      </div>
      <img
        src="../public/images/WatchIt!.png"
        className="card-img-top"
        width="80"
        height="80"
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

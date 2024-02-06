import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import "./components/css/global.css";
import Feed from "./components/review/feed/Feed.tsx";
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./components/profile/Profile.tsx";
import Search from "./components/search/Search.tsx";
import Comments from "./components/comment/Comments.tsx";
import MyReviews from "./components/review/my reviews/MyReviews.tsx";
import NewReviewForm from "./components/review/NewReviewForm.tsx";
import EditReviewForm from "./components/review/my reviews/EditReviewForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Feed />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/comments/:reviewId",
    element: <Comments />,
  },
  {
    path: "/myreviews",
    element: <MyReviews />,
  },
  {
    path: "/addReview/:movieId",
    element: <NewReviewForm />,
  },
  {
    path: "/edit/review/:reviewId",
    element: <EditReviewForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="1090894694760-7uaoumhhtlffr2nhj2bv7q81ig14otcn.apps.googleusercontent.com">
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

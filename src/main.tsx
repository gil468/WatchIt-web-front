import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import Home from "./components/Home.tsx";
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Profile from "./components/Profile.tsx";
import Search from "./components/Search.tsx";
import Comments from "./components/Comments.tsx";
import MyReviews from "./components/MyReviews.tsx";
import NewReview from "./components/NewReview.tsx";
import EditReview from "./components/EditReview.tsx";

const auzthorizedRouteLoader = () => {
  const token = localStorage.getItem("refresh_token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

const nonAuthorizedRouteLoader = () => {
  const token = localStorage.getItem("refresh_token");
  if (token) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: auzthorizedRouteLoader,
    element: <Home />,
  },
  {
    path: "/login",
    loader: nonAuthorizedRouteLoader,
    element: <Login />,
  },
  {
    path: "/register",
    loader: nonAuthorizedRouteLoader,
    element: <Register />,
  },
  {
    path: "/home",
    // loader: auzthorizedRouteLoader,
    element: <Home />,
  },
  {
    path: "/profile",
    // loader: auzthorizedRouteLoader,
    element: <Profile />,
  },
  {
    path: "/search",
    // loader: auzthorizedRouteLoader,
    element: <Search />,
  },
  {
    path: "/comments/:reviewId",
    // loader: auzthorizedRouteLoader,
    element: <Comments />,
  },
  {
    path: "/myreviews",
    // loader: auzthorizedRouteLoader,
    element: <MyReviews />,
  },
  {
    path: "/review/:movieId",
    // loader: auzthorizedRouteLoader,
    element: <NewReview />,
  },
  {
    path: "/edit/review/:reviewId",
    // loader: auzthorizedRouteLoader,
    element: <EditReview />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="1090894694760-7uaoumhhtlffr2nhj2bv7q81ig14otcn.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

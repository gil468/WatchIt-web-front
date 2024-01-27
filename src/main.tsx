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

const loader = () => {
  const token = localStorage.getItem("refresh_token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    loader,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="1090894694760-7uaoumhhtlffr2nhj2bv7q81ig14otcn.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

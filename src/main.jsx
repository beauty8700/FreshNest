import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./pages/home";
import "@fortawesome/fontawesome-free/css/all.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./pages/about";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; 

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <About /> },
  { path: "/shop", element: <Shop /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

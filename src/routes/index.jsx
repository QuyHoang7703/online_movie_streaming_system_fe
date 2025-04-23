import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@pages/auth/RegisterPage.jsx";
import LoginPage from "@pages/auth/LoginPage.jsx";
import "../index.css";
// import HomePage from "@pages/HomePage.jsx";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage.jsx";
import ProtectedLayout from "@pages/ProtectedLayout";
import GenreManagement from "@pages/admin/genre/GenreManagement";
import { lazy } from "react";
import ActorManagement from "@pages/admin/actor/ActorManagement";
import ActorForm from "@pages/admin/actor/ActorForm";
import MovieManagement from "@pages/admin/movie/MovieManagement";
const HomePage = lazy(() => import("@pages/HomePage.jsx"));
const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/otp-verify",
    element: <OTPVerifyPage />,
  },

  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/genres",
        element: <GenreManagement />,
      },
      {
        path: "/actors",
        element: <ActorManagement />,
      },
      {
        path: "/create-actor",
        element: <ActorForm />,
      },
      {
        path: "/movies",
        element: <MovieManagement />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@pages/auth/RegisterPage.jsx";
import LoginPage from "@pages/auth/LoginPage.jsx";
import "../index.css";

import OTPVerifyPage from "@pages/auth/OTPVerifyPage.jsx";
import ProtectedLayout from "@pages/ProtectedLayout";
import GenreManagement from "@pages/admin/genre/GenreManagement";
import { lazy } from "react";
import ActorManagement from "@pages/admin/actor/ActorManagement";
import ActorForm from "@pages/admin/actor/ActorForm";
import MovieManagement from "@pages/admin/movie/MovieManagement";

import MovieFormInfo from "@pages/admin/movie/MovieFormInfo";

import MovieFilter from "@components/MovieFilter";
import SubscriptionPlanManage from "@pages/admin/subscriptionPlan/SubscriptionPlanManage";

import Episode from "@pages/admin/movie/EpisodeManagement";
import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";
import ErrorPage from "@pages/auth/ErrorPage";
import CheckResetToken from "@pages/auth/CheckResetToken";
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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <CheckResetToken />,
  },
  {
    path: "/reset-password/form",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password/error",
    element: <ErrorPage />,
  },

  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/admin",
        element: <HomePage />,
      },
      {
        path: "/admin/genres",
        element: <GenreManagement />,
      },
      {
        path: "/admin/actors",
        element: <ActorManagement />,
      },
      {
        path: "/admin/create-actor",
        element: <ActorForm />,
      },
      {
        path: "/admin/movies",
        element: <MovieManagement />,
      },
      {
        path: "/admin/movies/create/:movieType",
        element: <MovieFormInfo />,
      },
      {
        path: "/admin/movies/update/:movieType/:movieId",
        element: <MovieFormInfo />,
      },
      {
        path: "/admin/movies/create/media",
        element: <MovieFilter />,
      },
      {
        path: "/admin/subscription-plans",
        element: <SubscriptionPlanManage />,
      },
      {
        path: "/admin/series-movie/:movieId/episodes",
        element: <Episode />,
      },
    ],
  },
]);

export default router;

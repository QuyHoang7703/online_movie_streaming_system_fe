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

import SubscriptionPlanManage from "@pages/admin/subscriptionPlan/SubscriptionPlanManage";

import ForgotPassword from "@pages/auth/ForgotPassword";
import ResetPassword from "@pages/auth/ResetPassword";
import ErrorPage from "@pages/auth/ErrorPage";
import CheckResetToken from "@pages/auth/CheckResetToken";
import GoogleCallbackPage from "@pages/auth/GoogleCallbackPage";
import { RequireRole } from "@context/AuthContext";
import UnauthorizedPage from "@pages/auth/UnauthorizedPage";
import HomePage from "@pages/user/HomePage";
import UserLayout from "@layouts/UserLayout";

import MovieList from "@pages/user/MovieList";
import VideoVersionManage from "@pages/admin/videoVersion/VideoVersionManage";
import MovieDetail from "@pages/user/MovieDetail";
import MovieWatching from "@pages/user/MovieWatching";
import ActorsPage from "@pages/user/ActorsPage";
import ActorDetail from "@pages/user/ActorDetail";
import AccountManagePage from "@pages/user/AccountManagePage";
import FavoriteMovies from "@pages/user/FavoriteMovies";
import UserInfoPage from "@pages/UserInfoPage";
import SearchResults from "@pages/user/SearchResults";

const HomePageAdmin = lazy(() => import("@pages/HomePageAdmin.jsx"));
const router = createBrowserRouter([
  // Public routes
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
    path: "/oauth2/callback",
    element: <GoogleCallbackPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },

  // Admin route
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <HomePageAdmin />
          </RequireRole>
        ),
      },
      {
        path: "/admin/genres",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <GenreManagement />
          </RequireRole>
        ),
      },
      {
        path: "/admin/actors",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <ActorManagement />
          </RequireRole>
        ),
      },
      {
        path: "/admin/create-actor",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <ActorForm />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <MovieManagement />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies/create/:movieType",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <MovieFormInfo />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies/update/:movieType/:movieId",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <MovieFormInfo />
          </RequireRole>
        ),
      },

      {
        path: "/admin/subscription-plans",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <SubscriptionPlanManage />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies/:movieId/video-versions",
        element: (
          <RequireRole allowedRoles={"ADMIN"}>
            <VideoVersionManage />
          </RequireRole>
        ),
      },

      // {
      //   path: "/admin/video-versions/:videoVersionId/episodes",
      //   element: (
      //     <RequireRole allowedRoles={"ADMIN"}>
      //       <Episode />
      //     </RequireRole>
      //   ),
      // },
    ],
  },

  // User route
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:movieType/:movieId",
        element: <MovieDetail />,
      },
      {
        path: "/xem-phim/:movieType/:movieId",
        element: <MovieWatching />,
      },
      {
        path: "/phim-le",
        element: <MovieList movieType="phim-le" />,
      },
      {
        path: "/phim-bo",
        element: <MovieList movieType="phim-bo" />,
      },
      {
        path: "/phim",
        element: <MovieList movieType="phim" />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/dien-vien",
        element: <ActorsPage />,
      },
      {
        path: "/dien-vien/:actorId",
        element: <ActorDetail />,
      },
      {
        path: "/user/profile",
        element: <AccountManagePage />,
        children: [
          {
            path: "/user/profile/favorite-movies",
            element: <FavoriteMovies />,
          },
          {
            path: "/user/profile/info",
            element: <UserInfoPage />,
          },
        ],
      },
    ],
  },
]);

export default router;

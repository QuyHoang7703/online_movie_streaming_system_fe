import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@pages/auth/RegisterPage.jsx";
import LoginPage from "@pages/auth/LoginPage.jsx";
import "../index.css";

import OTPVerifyPage from "@pages/auth/OTPVerifyPage.jsx";
import ProtectedLayout from "@pages/ProtectedLayout";
import UserLayout from "@pages/UserLayout";
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
import GoogleCallbackPage from "@pages/auth/GoogleCallbackPage";
import UnauthorizedPage from "@pages/auth/UnauthorizedPage";
import { RequireAuth, RequireRole } from "@context/AuthContext";

const HomePage = lazy(() => import("@pages/HomePage.jsx"));

const router = createBrowserRouter([
  // Public routes - không cần đăng nhập
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

  // User routes - cần đăng nhập và có vai trò USER
  {
    element: (
      <RequireAuth>
        <UserLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <RequireRole allowedRoles={["USER", "ADMIN"]}>
            <HomePage />
          </RequireRole>
        ),
      },
      {
        path: "/movies",
        element: (
          <RequireRole allowedRoles={["USER", "ADMIN"]}>
            <HomePage />
          </RequireRole>
        ),
      },
      {
        path: "/profile",
        element: (
          <RequireRole allowedRoles={["USER", "ADMIN"]}>
            <div>Trang hồ sơ</div>
          </RequireRole>
        ),
      },
      {
        path: "/favorites",
        element: (
          <RequireRole allowedRoles={["USER", "ADMIN"]}>
            <div>Phim yêu thích</div>
          </RequireRole>
        ),
      },
    ],
  },

  // Admin routes - cần đăng nhập và có vai trò ADMIN
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <HomePage />
          </RequireRole>
        ),
      },
      {
        path: "/admin/genres",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <GenreManagement />
          </RequireRole>
        ),
      },
      {
        path: "/admin/actors",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <ActorManagement />
          </RequireRole>
        ),
      },
      {
        path: "/admin/create-actor",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <ActorForm />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <MovieManagement />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies/create/:movieType",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <MovieFormInfo />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies/update/:movieType/:movieId",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <MovieFormInfo />
          </RequireRole>
        ),
      },
      {
        path: "/admin/movies/create/media",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <MovieFilter />
          </RequireRole>
        ),
      },
      {
        path: "/admin/subscription-plans",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <SubscriptionPlanManage />
          </RequireRole>
        ),
      },
      {
        path: "/admin/series-movie/:movieId/episodes",
        element: (
          <RequireRole allowedRoles="ADMIN">
            <Episode />
          </RequireRole>
        ),
      },
    ],
  },
]);

export default router;

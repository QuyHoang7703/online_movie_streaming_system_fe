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
import MovieForm from "@pages/admin/movie/MovieFormInfo";
import MovieFormInfo from "@pages/admin/movie/MovieFormInfo";
import MovieFormMedia from "@pages/admin/movie/MovieFormMedia";
import MovieFilter from "@components/MovieFilter";
import SubscriptionPlanManage from "@pages/admin/subscriptionPlan/SubscriptionPlanManage";
import SubscriptionPlanForm from "@pages/admin/subscriptionPlan/SubscriptionPlanForm";
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
      // {
      //   path: "/admin/subscription-plans/:subscriptionPlanId",
      //   element: <SubscriptionPlanForm />,
      // },
    ],
  },
]);

export default router;

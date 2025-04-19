import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@pages/auth/RegisterPage.jsx";
import LoginPage from "@pages/auth/LoginPage.jsx";
import "../index.css";
import HomePage from "@pages/HomePage.jsx";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage.jsx";
import ProtectedLayout from "@pages/ProtectedLayout";
import GenreManagement from "@pages/admin/GenreManagement";

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
    ],
  },
]);

export default router;

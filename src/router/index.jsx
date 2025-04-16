import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@pages/auth/RegisterPage.jsx";
import LoginPage from "@pages/auth/LoginPage.jsx";
import "../index.css";
import HomePage from "@pages/HomePage.jsx";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage.jsx";

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
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/otp-verify",
    element: <OTPVerifyPage />,
  },
]);

export default router;

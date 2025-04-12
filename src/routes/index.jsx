import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "@pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;

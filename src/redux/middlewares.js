import { logout } from "@redux/slides/authSlice";
import { persistor } from "./store";

export const logoutMiddleware = () => {
  return (next) => {
    return (action) => {
      if (action.type === logout.type) {
        persistor.purge();
      }

      return next(action);
    };
  };
};

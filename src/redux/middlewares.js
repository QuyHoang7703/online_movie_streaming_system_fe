import { logout } from "@redux/slides/authSlice";
import { persistor } from "./store";

// eslint-disable-next-line no-unused-vars
export const logoutMiddleware = (store) => (next) => (action) => {
  if (action.type === logout.type) {
    // Gọi next trước để reducer được xử lý
    const result = next(action);

    // Sau đó mới purge persistor
    setTimeout(() => {
      persistor.purge();
    }, 0);

    return result;
  }

  return next(action);
};

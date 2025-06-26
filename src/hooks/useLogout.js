import { useLogoutMutation } from "@service/rootApi";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@redux/slides/authSlice";
export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      // Sử dụng window.location.href để tránh race condition với RequireRole
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return { handleLogout };
};

export default useLogout;

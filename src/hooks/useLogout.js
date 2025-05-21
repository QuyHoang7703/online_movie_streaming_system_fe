import { useLogoutMutation } from "@service/rootApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "@redux/slides/authSlice";
export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      nagivate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return { handleLogout };
};

export default useLogout;

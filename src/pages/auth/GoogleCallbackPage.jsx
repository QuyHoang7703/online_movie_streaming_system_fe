import { useNotification } from "@hooks/useNotification";
import { useLoginWithGoogleMutation } from "@service/rootApi";
import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoading } from "@context/LoadingContext";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@redux/slides/authSlice";

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [
    loginWithGoogle,
    { data: response, isLoading, isSuccess, isError, error },
  ] = useLoginWithGoogleMutation();

  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch();
  console.log({ response });
  console.log({ info: response?.data?.userInfo });
  // Gọi login khi có code
  useEffect(() => {
    if (code) {
      showLoading();
      loginWithGoogle(code);
      console.log({ response });
    }
  }, [code, loginWithGoogle]);

  // Xử lý thành công
  useEffect(() => {
    if (isSuccess && response) {
      hideLoading();
      dispatch(saveUserInfo(response?.data?.userInfo));
      showNotification("success", response?.message || "Đăng nhập thành công");
      navigate("/admin", { replace: true });
    }
  }, [isSuccess, response, navigate]);

  // Xử lý lỗi
  useEffect(() => {
    if (isError) {
      hideLoading(); // Đảm bảo ẩn loading khi có lỗi
      showNotification("error", error?.data?.message || "Đăng nhập thất bại");
    }
  }, [isError, error]);

  return null;
};
export default GoogleCallbackPage;

import { useVerifyTokenQuery } from "@service/rootApi";
import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CheckResetToken = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log({ token });
  const { data: verifyTokenResponse, isFetching } = useVerifyTokenQuery({
    token,
  });
  const checkResult = verifyTokenResponse?.data;
  console.log({ checkResult });

  useEffect(() => {
    if (!isFetching) {
      if (checkResult === true) {
        navigate(`/reset-password/form?token=${token}`, { replace: true });
      } else {
        navigate("/reset-password/error", {
          replace: true,
          state: {
            title: "Token đã hết hạn hoặc không hợp lệ",
            description: "Vui lòng thử lại hoặc liên hệ hỗ trợ để được hỗ trợ.",
            image: "/error-image.png",
            actionText: "Quay lại trang đăng nhập",
            actionLink: "/login",
          },
        });
      }
    }
  }, [isFetching, checkResult, navigate, token]);
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin tip="Đang kiểm tra token..." size="large" />
    </div>
  );
};
export default CheckResetToken;

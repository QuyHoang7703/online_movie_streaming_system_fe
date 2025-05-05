import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="403"
        title="Không có quyền truy cập"
        subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
        extra={[
          <Button type="primary" key="home" onClick={handleHome}>
            Về trang chủ
          </Button>,
          <Button key="back" onClick={handleBack}>
            Quay lại
          </Button>,
        ]}
      />
    </div>
  );
};

export default UnauthorizedPage;

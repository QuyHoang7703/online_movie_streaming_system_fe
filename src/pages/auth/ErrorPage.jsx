import { ArrowLeftOutlined, LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const { title, description, image, actionText, actionLink } = location.state;
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#191b24] p-8 text-center">
      <img src={image} alt="error-image" className="mb-4 max-w-[500px]" />
      <p className="mb-2 text-3xl font-bold text-white">
        {title || "Lỗi xảy ra"}
      </p>
      <p className="mb-4 text-xl text-gray-600">
        {description || "Đã có lỗi xảy ra. Vui lòng thử lại sau."}
      </p>
      {actionText && actionLink && (
        <Link to={actionLink}>
          <Button
            icon={<LeftOutlined />}
            type="primary"
            size="large"
            className="mt-2 bg-mainColor !p-4 !font-bold !text-black hover:!bg-mainColorHover sm:mt-3 sm:!p-5"
          >
            {actionText}
          </Button>
        </Link>
      )}
    </div>
  );
};
export default ErrorPage;

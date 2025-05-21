import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const PaymentStatusModal = ({
  visible,
  onClose,
  isSuccess = true,
  productName = "",
  redirectPath = "",
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={true}
      onCancel={handleClose}
      width={400}
      centered
      className={`payment-status-modal ${isSuccess ? "success" : "error"}`}
      bodyStyle={{
        padding: "30px 20px",
        textAlign: "center",
        borderRadius: "12px",
        backgroundColor: isSuccess ? "#f0f8f0" : "#fff1f0",
      }}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${
            isSuccess ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isSuccess ? (
            <CheckOutlined className="text-3xl text-white" />
          ) : (
            <CloseOutlined className="text-3xl text-white" />
          )}
        </div>

        {/* Decorative elements (balloons) for success */}
        {isSuccess && (
          <>
            <div className="absolute -left-6 -top-4 h-4 w-4 rounded-full bg-blue-500"></div>
            <div className="absolute -right-2 -top-8 h-3 w-3 rounded-full bg-green-400"></div>
            <div className="absolute -left-12 top-8 h-5 w-5 rounded-full bg-blue-400"></div>
            <div className="absolute -right-10 top-4 h-6 w-6 rounded-full bg-green-300"></div>
          </>
        )}

        <h2
          className={`mt-4 text-2xl font-bold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Đặt Hàng Thành Công" : "Lỗi Thanh Toán"}
        </h2>

        <p className="my-4 text-gray-600">
          Đơn hàng của bạn ({productName})
          {isSuccess ? " đã được xác nhận thành công" : " chưa được đặt"}
        </p>

        {isSuccess ? (
          <Button
            type="default"
            onClick={handleClose}
            className="mt-4 flex items-center hover:!border-green-600 hover:!text-green-600"
          >
            Xem chi tiết đơn hàng <span className="ml-1">›</span>
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={handleClose}
            className="mt-4 flex items-center"
          >
            Thử lại thanh toán <span className="ml-1">›</span>
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default PaymentStatusModal;

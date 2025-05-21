import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PaymentStatusModal from "@components/common/PaymentStatusModal";
import { Button } from "antd";
import StepProgress from "@components/common/StepProgress";

const PaymentErrorPage = () => {
  const [searchParams] = useSearchParams();
  const subscriptionPlanId = searchParams.get("subscriptionPlanId");
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <PaymentStatusModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={false}
        productName="Gói Đăng Ký Phim"
        redirectPath=""
      />

      <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
        <div className="container mx-auto mb-8 px-4">
          <h1 className="mb-4 text-2xl font-bold text-white">
            Kết quả đăng ký
          </h1>
          <StepProgress current={2} />
        </div>

        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-lg border border-gray-700 bg-dark-100 p-8 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="mb-2 text-2xl font-bold text-white">
            Thanh Toán Thất Bại
          </h2>
          <p className="mb-6 text-gray-400">
            Chúng tôi không thể xử lý thanh toán của bạn. Vui lòng thử lại hoặc
            sử dụng phương thức thanh toán khác.
          </p>

          {subscriptionPlanId ? (
            <Link to={`/user/subscription-plan/${subscriptionPlanId}`}>
              <Button
                type="primary"
                danger
                className="h-10 w-full rounded-md text-base font-medium"
              >
                Thử Lại
              </Button>
            </Link>
          ) : (
            <Link to="/user/subscription-plan">
              <Button
                type="primary"
                danger
                className="h-10 w-full rounded-md text-base font-medium"
              >
                Quay Lại Gói Đăng Ký
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentErrorPage;

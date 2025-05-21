import { useState } from "react";
import PaymentSummary from "@components/user/subscriptionPlan/PaymentSummary";
import { useGetSubscriptionOrderDetailQuery } from "@service/subscriptionOrderApi";
import { useSearchParams } from "react-router-dom";
import PaymentStatusModal from "@components/common/PaymentStatusModal";
import StepProgress from "@components/common/StepProgress";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const transactionCode = searchParams.get("transactionCode");
  const subscriptionOrderResponse =
    useGetSubscriptionOrderDetailQuery(transactionCode);
  const subscriptionOrderDetail = subscriptionOrderResponse.data?.data;

  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <PaymentStatusModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        isSuccess={true}
        productName={
          subscriptionOrderDetail?.subscriptionPlanName || "Gói Đăng Ký Phim"
        }
        redirectPath=""
      />

      <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
        <div className="container mx-auto mb-8 px-4">
          <p className="mb-4 text-2xl font-bold text-white">Kết quả đăng ký</p>
          <StepProgress current={2} />
        </div>

        <div className="mx-auto w-[50%]">
          {subscriptionOrderDetail && (
            <PaymentSummary
              subscriptionPlanName={
                subscriptionOrderDetail.subscriptionPlanName
              }
              planDuration={subscriptionOrderDetail}
              isPaymentSuccess={true}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default PaymentSuccessPage;

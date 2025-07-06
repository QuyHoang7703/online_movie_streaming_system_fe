import { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PlanDurationItem from "@components/user/subscriptionPlan/PlanDurationItem";
import { Link, useParams } from "react-router-dom";
import { useGetSubscriptionPlanDetailQuery } from "@service/admin/subscriptionPlanApi";
import {
  useCreatePayUrlMutation,
  useGetActiveLatestSubscriptionOrderQuery,
} from "@service/subscriptionOrderApi";
import { useLoading } from "@context/LoadingContext";
import PaymentSummary from "@components/user/subscriptionPlan/PaymentSummary";
import StepProgress from "@components/common/StepProgress";
import dayjs from "dayjs";
import { useNotification } from "@hooks/useNotification";

const PlanDurationPage = () => {
  const { subscriptionPlanId } = useParams();

  const { data: planDetailResponse, isSuccess } =
    useGetSubscriptionPlanDetailQuery(subscriptionPlanId);

  const [subscriptionPlanDetail, setSubscriptionPlanDetail] = useState({});
  const [selectedPlanData, setSelectedPlanData] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  useEffect(() => {
    if (isSuccess && planDetailResponse?.data) {
      const planData = planDetailResponse.data;
      setSubscriptionPlanDetail(planData);

      if (planData.planDurations && planData.planDurations.length > 0) {
        setSelectedDuration(planData.planDurations[0].id);
        setSelectedPlanData(planData.planDurations[0]);
      }
    }
  }, [isSuccess, planDetailResponse]);

  // Handle plan selection
  const handlePlanSelection = (durationId) => {
    setSelectedDuration(durationId);
    const selectedPlan = subscriptionPlanDetail.planDurations.find(
      (plan) => plan.id === durationId,
    );
    if (selectedPlan) {
      setSelectedPlanData(selectedPlan);
    }
  };

  const { data: activeLatestSubscriptionOrder } =
    useGetActiveLatestSubscriptionOrderQuery(subscriptionPlanId);

  const today = dayjs();
  const nowDate = today.format("DD/MM/YYYY");

  let formattedNextPaymentDate = "";
  if (selectedPlanData) {
    let startDate = today;

    if (activeLatestSubscriptionOrder?.data) {
      const lastEndDate = dayjs(activeLatestSubscriptionOrder.data.endDate);
      if (lastEndDate.isAfter(today)) {
        startDate = lastEndDate;
      }
    }

    const nextPaymentDate = startDate.add(
      selectedPlanData.durationInMonths,
      "month",
    );

    formattedNextPaymentDate = nextPaymentDate.format("DD/MM/YYYY");
  }

  const [createPayUrl, { isLoading }] = useCreatePayUrlMutation();

  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  const { showNotification } = useNotification();

  const handlePayment = async (planDurationId) => {
    if (planDurationId) {
      try {
        const paymentResponse = await createPayUrl(planDurationId).unwrap();
        window.location.href = paymentResponse.data.paymentUrl;
      } catch (error) {
        showNotification(
          "error",
          error.data.message || "Lỗi tạo link thanh toán",
        );
      }
    }
  };

  return (
    <div className="mx-auto mt-20 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/user/subscription-plan"
          className="mb-4 flex cursor-pointer items-center text-green-500 hover:text-green-600"
        >
          <ArrowLeftOutlined />
          <p className="ml-2 text-[1.1vw] text-white hover:text-white/80">
            Xem danh sách gói
          </p>
        </Link>
        <p className="text-2xl font-bold text-white">Chọn thời hạn gói</p>

        <StepProgress current={1} />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column: Plan Duration Options */}
        <div className="w-full lg:w-2/3">
          {/* Plan Duration Options */}
          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(subscriptionPlanDetail.planDurations || []).map(
              (planDuration) => (
                <PlanDurationItem
                  key={planDuration.id}
                  planDuration={planDuration}
                  isSelected={selectedDuration === planDuration.id}
                  onClick={() => handlePlanSelection(planDuration.id)}
                />
              ),
            )}
          </div>

          {/* Payment Methods */}
          {/* <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-white">
              Chọn phương thức thanh toán
            </h2>

            <div className="mb-4 flex items-center text-sm text-gray-400">
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">
                i
              </span>
              Chọn phương thức thanh toán phù hợp & bấm nút Thanh toán để hoàn
              thành đăng ký gói của bạn nhé
            </div>

            <div className="mb-4 flex items-center text-sm text-gray-400">
              <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">
                i
              </span>
              Hủy gói bất cứ lúc nào bạn muốn
            </div>

            <div className="mb-8 flex items-start text-sm text-gray-400">
              <span className="mr-2 flex-shrink-0 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>
                Bạn hãy yên tâm Emovie luôn đảm bảo mọi giao dịch của bạn đều
                được bảo mật tuyệt đối
              </span>
            </div>
          </div> */}
          <div className="mt-6 text-sm italic text-gray-400">
            Cảm ơn bạn đã đồng hành cùng Emovie 💖 Chúng tôi cam kết bảo mật mọi
            giao dịch và sẽ sớm hỗ trợ thêm nhiều phương thức thanh toán tiện
            lợi hơn!
          </div>
        </div>

        {/* Right Column: Payment Info */}
        <div className="w-full lg:w-1/3">
          <PaymentSummary
            subscriptionPlanName={subscriptionPlanDetail.name}
            planDuration={selectedPlanData}
            formattedNextPaymentDate={formattedNextPaymentDate}
            nowDate={nowDate}
            handlePayment={handlePayment}
            activeSubscription={activeLatestSubscriptionOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanDurationPage;

import { useGetSubscriptionOrdersQuery } from "@service/subscriptionOrderApi";
import { Modal, Pagination } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import PaymentSummary from "@components/user/subscriptionPlan/PaymentSummary";
import "@styles/styles.css";
export default function SubscriptionOrderPage() {
  const [selected, setSelected] = useState(null);
  const { data: subscriptionOrdersResponse, isLoading } =
    useGetSubscriptionOrdersQuery({ page: 1, size: 10 });

  const getStatus = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    return end >= now ? "active" : "expired";
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (order) => {
    setSelected(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const handlePageChange = (page, pageSize) => {
    setPagination({
      page,
      size: pageSize,
    });
  };

  const getStatusLabel = (status) => {
    if (status === "active")
      return (
        <span className="rounded-full bg-green-700 px-2 py-0.5 text-xs text-white">
          Đang sử dụng
        </span>
      );
    if (status === "expired")
      return (
        <span className="rounded-full bg-gray-600 px-2 py-0.5 text-xs text-white">
          Đã hết hạn
        </span>
      );
  };
  const subscriptionOrders = subscriptionOrdersResponse?.data?.result || [];

  return (
    <div className="p-6 text-white">
      <h2 className="mb-4 text-2xl font-bold">Lịch sử mua gói dịch vụ</h2>
      <div className="grid gap-4">
        {subscriptionOrders.map((plan) => {
          const status = getStatus(plan.endDate);
          return (
            <div
              key={plan.id}
              className="cursor-pointer rounded-xl border border-gray-700 bg-dark-100 p-4 hover:bg-gray-800"
              onClick={() => handleOrderClick(plan)}
            >
              <div className="flex justify-between">
                <span className="font-medium">{plan.subscriptionPlanName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {new Date(plan.startDate).toLocaleDateString("vi-VN")} -{" "}
                    {new Date(plan.endDate).toLocaleDateString("vi-VN")}
                  </span>
                  {getStatusLabel(status)}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Thời hạn: {plan.durationInMonths} tháng —{" "}
                {plan.price.toLocaleString("vi-VN")} VND
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-7 flex justify-end">
        <Pagination
          current={pagination.page}
          pageSize={pagination.size}
          total={subscriptionOrdersResponse?.data?.meta?.totalElements || 0}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
      <Modal
        // title="Chi tiết thanh toán"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        className="ant-modal-header"
      >
        {selected && (
          <PaymentSummary
            subscriptionPlanName={selected.subscriptionPlanName}
            planDuration={{
              durationInMonths: selected.durationInMonths,
              price: selected.price,
              startDate: selected.startDate,
              endDate: selected.endDate,
              createAt: selected.createAt,
            }}
            formattedNextPaymentDate={dayjs(selected.endDate).format(
              "DD/MM/YYYY",
            )}
            nowDate={dayjs(selected.startDate).format("DD/MM/YYYY")}
            isPaymentSuccess={true}
            userInfo={{
              email: selected.email,
              name: selected.name,
              phone: selected.phone || "",
            }}
            isAdmin={true}
          />
        )}
      </Modal>
    </div>
  );
}

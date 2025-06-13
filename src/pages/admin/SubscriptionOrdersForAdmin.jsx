import { useGetSubscriptionOrdersQuery } from "@service/subscriptionOrderApi";
import React, { useState } from "react";
import { Modal, Pagination } from "antd";
import PaymentSummary from "@components/user/subscriptionPlan/PaymentSummary";
import dayjs from "dayjs";
import GenericModal from "@context/GenericModal";
import "@styles/styles.css";
const SubscriptionOrdersForAdmin = () => {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: subscriptionOrdersResponse, isLoading } =
    useGetSubscriptionOrdersQuery({ page: 1, size: 10 });

  const getStatus = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    return end >= now ? "active" : "expired";
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

  const handleOrderClick = (order) => {
    setSelected(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const subscriptionOrders = subscriptionOrdersResponse?.data?.result || [];
  return (
    <div className="h-full bg-dark-200 p-7">
      <div className="p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold">Lịch sử mua gói dịch vụ</h2>
        <div className="grid gap-3">
          {subscriptionOrders.map((order) => {
            const status = getStatus(order.endDate);
            return (
              <div
                key={order.id}
                className="cursor-pointer rounded-lg border border-gray-700 bg-dark-100 p-4 transition-all duration-200 hover:border-green-500 hover:shadow-md"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold text-white">
                    {order.subscriptionPlanName}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>
                      {new Date(order.startDate).toLocaleDateString("vi-VN")} -{" "}
                      {new Date(order.endDate).toLocaleDateString("vi-VN")}
                    </span>
                    {getStatusLabel(status)}
                  </div>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-gray-400">
                  <span>
                    Email khách hàng:{" "}
                    {order.email || <span className="italic">Chưa có</span>}
                  </span>
                  {/* <span> | </span>
                  <span>
                    Tên khách hàng:{" "}
                    {order.name || <span className="italic">Chưa có</span>}
                  </span> */}
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Thời hạn: {order.durationInMonths} tháng —{" "}
                  {order.price.toLocaleString("vi-VN")} VND
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
};

export default SubscriptionOrdersForAdmin;

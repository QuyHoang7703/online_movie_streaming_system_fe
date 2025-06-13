import { useGetSubscriptionOrdersQuery } from "@service/subscriptionOrderApi";
import { Pagination } from "antd";
import { useState } from "react";

const mockData = [
  {
    id: 1,
    subscriptionPlanName: "Gói Premium",
    durationInMonths: 3,
    price: 150000,
    startDate: "2025-02-01",
    endDate: "2025-05-01",
  },
  {
    id: 2,
    subscriptionPlanName: "Gói Cơ Bản",
    durationInMonths: 1,
    price: 50000,
    startDate: "2025-01-01",
    endDate: "2025-02-01",
  },
];

export default function SubscriptionOrderPage() {
  const [selected, setSelected] = useState(null);
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
              onClick={() => setSelected(plan)}
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
    </div>
  );
}

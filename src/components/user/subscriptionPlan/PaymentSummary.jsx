import { Button } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const PaymentSummary = ({
  subscriptionPlanName,
  planDuration,
  formattedNextPaymentDate,
  nowDate,
  handlePayment,
  isPaymentSuccess = false,
  activeSubscription = null,
}) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Xác định ngày bắt đầu dựa vào gói hiện tại
  const startDate = activeSubscription?.data
    ? dayjs(activeSubscription.data.endDate).add(1, "day").format("DD/MM/YYYY")
    : nowDate;

  return (
    <div>
      <div className="sticky top-4 rounded-lg border border-gray-700 bg-dark-100 p-6">
        <h2 className="mb-1 text-xl font-bold text-gray-100">
          Thông tin thanh toán
        </h2>
        <p className="mb-4 text-sm text-gray-400">
          Cho tài khoản Emovie: {userInfo.email}
        </p>

        <div className="my-4 space-y-4 border-y border-gray-700 py-4">
          <div className="flex justify-between">
            <span className="text-gray-300">Tên gói</span>
            <span className="font-medium text-white">
              {subscriptionPlanName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Thời hạn gói</span>
            <span className="font-medium text-white">
              {planDuration?.durationInMonths || ""} Tháng
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Ngày hiệu lực</span>
            <span className="font-medium text-white">
              {isPaymentSuccess
                ? dayjs(planDuration?.startDate).format("DD/MM/YYYY")
                : startDate}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-300">Ngày hết hạn</span>
            <span className="font-medium text-white">
              {isPaymentSuccess
                ? dayjs(planDuration?.endDate).format("DD/MM/YYYY")
                : formattedNextPaymentDate}
            </span>
          </div>

          {activeSubscription?.data && !isPaymentSuccess && (
            <div className="rounded-lg border border-yellow-500 bg-yellow-100 p-3 text-yellow-900">
              <p className="text-sm">
                <span className="font-semibold">Lưu ý:</span> Gói hiện tại của
                bạn còn hiệu lực đến ngày{" "}
                <span className="font-bold">
                  {dayjs(activeSubscription.data.endDate).format("DD/MM/YYYY")}
                </span>
                . Gói mới sẽ được kích hoạt sau ngày này.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-300">Trị giá</span>
            <span className="font-medium text-white">
              {planDuration?.price
                ? planDuration.price.toLocaleString("vi-VN")
                : "0"}{" "}
              VND
            </span>
          </div>
        </div>

        {!isPaymentSuccess ? (
          <div className="mb-6 flex items-center justify-between">
            <span className="font-medium text-gray-100">Thành tiền</span>
            <span className="text-2xl font-bold text-green-400">
              {planDuration?.price
                ? planDuration.price.toLocaleString("vi-VN")
                : "0"}{" "}
              VND
            </span>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-gray-300">Thời gian thanh toán</span>
            <span className="font-medium text-white">
              {dayjs(planDuration?.createdAt).format("HH:mm DD/MM/YYYY")}
            </span>
          </div>
        )}

        {!isPaymentSuccess && (
          <>
            <Button
              type="primary"
              className="h-12 w-full rounded-md bg-green-500 text-base font-bold text-white hover:!bg-green-500/80"
              onClick={() => handlePayment(planDuration?.id)}
            >
              Tiếp tục thanh toán
            </Button>

            <div className="mt-4 text-center text-xs text-gray-400">
              <div className="mb-2 flex items-center justify-center">
                <img
                  src="https://imc.dvs.vn/wp-content/uploads/2022/03/dss-1.png"
                  alt="DSS"
                  className="h-6"
                />
                <span className="ml-2">
                  Bảo mật SSL/TLS mọi thông tin giao dịch của bạn được bảo mật
                  an toàn
                </span>
              </div>

              <p className="mt-4">
                Bằng việc thanh toán, bạn xác nhận đã đọc và đồng ý với{" "}
                <a href="#" className="text-green-400 hover:underline">
                  Điều khoản & Chính sách của VieON
                </a>
                . Và nhận các thông báo từ VieON về dịch vụ khả hạn. Bạn có thể
                hủy gia hạn bất cứ lúc nào.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;

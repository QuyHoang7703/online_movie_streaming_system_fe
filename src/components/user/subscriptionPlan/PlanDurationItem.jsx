import PropTypes from "prop-types";

const PlanDurationItem = ({
  planDuration,
  isSelected = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-green-500 ${isSelected ? "border-green-500" : "border-gray-200"}`}
      onClick={onClick}
    >
      {/* Popular badge */}
      {/* {isPopular && (
        <div className="absolute -top-3 right-8 rounded-md bg-yellow-500 px-3 py-1 text-xs text-white">
          Nhiều người mua nhất
        </div>
      )} */}

      {/* Auto-renew badge */}
      {/* {autoRenew && (
        <div className="absolute -left-2 -top-6 rotate-[-45deg] transform bg-purple-600 px-3 py-1 text-xs text-white">
          DEAL
        </div>
      )} */}
      <div className="flex flex-col justify-between gap-4">
        {/* Duration */}
        <div className="mt-2 text-center">
          <h3 className="text-lg font-bold text-white">
            {planDuration.durationInMonths < 10
              ? `0${planDuration.durationInMonths}`
              : planDuration.durationInMonths}{" "}
            THÁNG
          </h3>
          {/* {autoRenew && (
            <div className="text-sm font-medium text-gray-200">
              TỰ ĐỘNG GIA HẠN
              <div className="mt-1 text-xs text-gray-300">
                Ưu đãi lần đầu, được tự gia hạn với giá thường sau khi hết hạn
              </div>
            </div>
          )} */}
        </div>

        {/* Price */}
        <div className="text-center">
          {/* {discountPercent > 0 && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                {originalPrice} VND
              </span>
              <span className="inline-block rounded bg-red-500 px-1 py-0.5 text-xs text-white">
                -{discountPercent}%
              </span>
            </div>
          )} */}
          <div className="mt-1 text-xl font-bold text-green-500">
            {planDuration.price.toLocaleString("vi-VN")} VND
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDurationItem;

import { Button } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const getBackgroundColor = (planName) => {
  switch (planName) {
    case "VIP":
      return "bg-gradient-to-r from-green-600 to-green-500";
    case "VIP HBO GO":
      return "bg-gradient-to-r from-blue-800 to-blue-600";
    case "SPORT K+":
      return "bg-gradient-to-r from-red-800 to-red-600";
    case "ALL ACCESS":
      return "bg-gradient-to-r from-yellow-700 to-yellow-500";
    default:
      return "bg-gray-700"; // fallback
  }
};

const SubscriptionPlanItem = ({ subscriptionPlan }) => {
  const navigate = useNavigate();
  const showDetailSubscriptionPlan = (subscriptionPlanId) => {
    navigate(`/user/subscription-plan/${subscriptionPlanId}`);
  };
  return (
    <div
      className={`flex h-[500px] flex-col overflow-hidden rounded-lg border border-gray-200 ${getBackgroundColor(
        subscriptionPlan.name,
      )}`}
    >
      {/* Top Section (Title, Price, Description) - Fixed Height */}
      <div className="h-[180px] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-white">
            {subscriptionPlan.name}
          </p>
          {/* {subscriptionPlan.discountPercent > 0 && (
            <span className="inline-block rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
              -{subscriptionPlan.discountPercent}%
            </span>
          )} */}
        </div>

        <div className="mt-3">
          {/* {originalPrice && discountPercent > 0 && (
            <span className="mr-2 text-sm text-gray-300 line-through">
              {originalPrice}
            </span>
          )} */}
          <span className="text-3xl font-bold text-white">
            {subscriptionPlan.planDurations[0].price.toLocaleString("vi-VN")}
            <span className="text-sm">đ</span>
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-100">
          {subscriptionPlan.description}
        </p>
      </div>

      {/* Features Section - Takes Remaining Space */}
      <div className="flex-grow p-5 pt-0">
        <div className="flex flex-col gap-4">
          {subscriptionPlan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 text-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="10" />
                  <path
                    fill="white"
                    d="M10 6v8M6 10h8"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="ml-3 text-gray-100">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button Section - Fixed Height */}
      <div className="mt-auto p-5 pt-0">
        <Button
          className="h-12 w-full rounded-full border-none !bg-green-500 font-bold text-white hover:!bg-green-500/80 hover:!text-white/80"
          size="large"
          onClick={() => showDetailSubscriptionPlan(subscriptionPlan.id)}
        >
          {`Đăng ký gói ${subscriptionPlan.name}`}
        </Button>
      </div>
    </div>
  );
};

SubscriptionPlanItem.propTypes = {
  title: PropTypes.string,
  originalPrice: PropTypes.string,
  discountPercent: PropTypes.number,
  currentPrice: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.array,
  backgroundColor: PropTypes.string,
  buttonText: PropTypes.string,
};

export default SubscriptionPlanItem;

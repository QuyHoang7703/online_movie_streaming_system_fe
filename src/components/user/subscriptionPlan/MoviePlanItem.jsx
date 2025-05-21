import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const MoviePlanItem = ({
  movieTitle,
  backdropUrl,
  originalTitle,
  onCancel,
  subscriptionPlan,
  handleSubscribe,
}) => {
  return (
    <div className="relative max-w-lg rounded-lg border border-yellow-700 bg-black p-5">
      {/* Close button */}
      <button
        onClick={onCancel}
        className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-white"
      >
        <CloseOutlined />
      </button>

      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="mb-4 text-2xl font-bold text-green-500">
          Đăng ký {subscriptionPlan?.name} để không bỏ lỡ
        </h2>
        <p className="text-xl font-bold text-green-500">{movieTitle}</p>
      </div>

      {/* Movie Banner */}
      <div className="mb-6 overflow-hidden rounded-lg">
        <div className="relative">
          <img
            src={
              backdropUrl ||
              "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg"
            }
            alt={movieTitle || "Gladiator II"}
            className="w-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <p className="text-4xl font-bold text-white">{originalTitle}</p>
            <p className="text-sm font-medium text-white">{movieTitle}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col items-center gap-3">
          {subscriptionPlan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="text-yellow-300">
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
          {/* <img
            src="https://www.hbogoasia.vn/static/media/hbo-go-d-partner.0c78a86d.svg"
            alt="HBO"
            className="h-8 w-8 object-contain"
          />
          <span className="text-sm text-white">Phim bom tấn Âu Mỹ HBO GO</span> */}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6 text-center">
        <h3 className="text-4xl font-bold text-yellow-500">
          {subscriptionPlan?.planDurations[0]?.price.toLocaleString("vi-VN")}
          VND
        </h3>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Button
          type="primary"
          onClick={() => handleSubscribe(subscriptionPlan?.id)}
          className="h-12 w-full rounded-full border border-yellow-600 !bg-yellow-500/90 text-base font-bold text-black hover:!bg-yellow-600"
        >
          Đăng ký {subscriptionPlan?.name}
        </Button>
      </div>
    </div>
  );
};

export default MoviePlanItem;

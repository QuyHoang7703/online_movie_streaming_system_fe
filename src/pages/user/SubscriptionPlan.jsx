import { ShoppingCartOutlined } from "@ant-design/icons";
import SubscriptionPlanItem from "@components/user/subscriptionPlan/SubscriptionPlanItem";
import { CalendarMonth, Subscriptions } from "@mui/icons-material";
import { useGetSubscriptionPlansQuery } from "@service/admin/subscriptionPlanApi";
import { Steps } from "antd";
import StepProgress from "@components/common/StepProgress";

const SubscriptionPlan = () => {
  // const subscriptionPlans = [
  //   {
  //     title: "VIP",
  //     originalPrice: "69.000đ",
  //     discountPercent: 50,
  //     currentPrice: "34.500",
  //     description: "Dành cho Fan phim Châu Á và VieON Original",
  //     features: [
  //       "Phim/show độc quyền VieON",
  //       "Kho phim Việt, Trung, Hàn lớn nhất",
  //       "200+ kênh truyền hình trực tuyến",
  //     ],
  //     backgroundColor: "bg-gradient-to-r from-green-600 to-green-500",
  //     buttonText: "Đăng ký gói VIP",
  //   },
  //   {
  //     title: "VIP HBO GO",
  //     originalPrice: "",
  //     discountPercent: 0,
  //     currentPrice: "99.000",
  //     description: "Dành cho Fan phim Âu Mỹ, xem nội dung gói VIP",
  //     features: [
  //       "Phim/show độc quyền VieON",
  //       "Kho phim Việt, Trung, Hàn lớn nhất",
  //       "200+ kênh truyền hình trực tuyến",
  //       "Phim bom tấn Âu Mỹ HBO GO",
  //     ],
  //     backgroundColor: "bg-gradient-to-r from-blue-800 to-blue-600",
  //     buttonText: "Đăng ký gói VIP HBO GO",
  //   },
  //   {
  //     title: "SPORT K+",
  //     originalPrice: "",
  //     discountPercent: 0,
  //     currentPrice: "189.000",
  //     description: "Dành cho Fan Thể Thao K+, xem nội dung gói VIP",
  //     features: [
  //       "Phim/show độc quyền VieON",
  //       "Kho phim Việt, Trung, Hàn lớn nhất",
  //       "200+ kênh truyền hình trực tuyến",
  //       "Thể thao Ngoại hạng Anh, 5 kênh K+",
  //     ],
  //     backgroundColor: "bg-gradient-to-r from-red-800 to-red-600",
  //     buttonText: "Đăng ký gói SPORT K+",
  //   },
  //   {
  //     title: "ALL ACCESS",
  //     originalPrice: "",
  //     discountPercent: 0,
  //     currentPrice: "229.000",
  //     description: "Xem TẤT CẢ nội dung trên Emovie",
  //     features: [
  //       "Phim/show độc quyền VieON",
  //       "Kho phim Việt, Trung, Hàn lớn nhất",
  //       "200+ kênh truyền hình trực tuyến",
  //       "Phim bom tấn Âu Mỹ HBO GO",
  //       "Thể thao Ngoại hạng Anh, 5 kênh K+",
  //     ],
  //     backgroundColor: "bg-gradient-to-r from-yellow-700 to-yellow-500",
  //     buttonText: "Đăng ký gói ALL ACCESS",
  //   },
  // ];
  const subscriptionPlansResponse = useGetSubscriptionPlansQuery({
    page: 1,
    size: 10,
  });

  const subscriptionPlans = subscriptionPlansResponse.data?.data?.result || [];
  return (
    <div className="mx-auto mt-20 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <p className="text-2xl font-bold text-white">
            Chọn gói VIP phù hợp với bạn
          </p>
          <StepProgress current={0} />
        </div>

        <div className="-mx-4 flex flex-wrap">
          {subscriptionPlans.map((subscriptionPlan) => (
            <div
              key={subscriptionPlan.id}
              className="mb-8 w-full px-4 sm:w-1/2 lg:w-1/4"
            >
              <SubscriptionPlanItem subscriptionPlan={subscriptionPlan} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="rounded-lg bg-gray-800 p-4">
            <h3 className="mb-3 text-xl font-bold text-white">Đặc quyền VIP</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-white">Không quảng cáo</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-white">Full HD/4K</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-white">
                  Thuyết minh/Phụ đề tiếng Việt
                </span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-white">Xem trên nhiều thiết bị</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-white">Xem sớm nhất</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionPlan;

import { Button } from "antd";
import { InputOTP } from "antd-input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const OTPVerifyPage = ({ email }) => {
  const { control, handleSubmit } = useForm();
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Set true ban đầu

  useEffect(() => {
    // Chỉ chạy countdown khi còn thời gian
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false); // Enable button khi hết thời gian
    }
  }, [countdown]); // Thêm countdown vào dependencies

  const handleResendOTP = () => {
    // Gọi API gửi lại OTP
    // ...

    // Reset countdown và disable button
    setCountdown(180);
    setIsResendDisabled(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen w-full flex-col justify-between bg-[#1B2431] p-5 lg:flex-row">
      <div className="flex w-full flex-col justify-center p-4 sm:px-8 md:px-12 lg:w-[40%] lg:px-16">
        <form className="mx-auto flex w-full max-w-[350px] flex-col gap-4 sm:gap-5">
          <p className="text-center text-xl font-bold text-white sm:text-2xl">
            Xác nhận OTP
          </p>
          <p className="mt-2 text-sm italic text-white/80 sm:text-base">
            Vui lòng nhập mã OTP đã được gửi đến email {email} của bạn để xác
            nhận đăng ký tài khoản
          </p>
          <InputOTP inputMode="numeric" length={6} />
          <p className="mt-2 text-sm italic text-white/80 sm:text-base">
            Mã xác nhận có thể đến chậm bạn vui lòng chờ chút nha!
            {countdown > 0 ? (
              <span> Có thể gửi lại sau ({formatTime(countdown)})</span>
            ) : (
              <span> Bạn có thể gửi lại OTP ngay bây giờ</span>
            )}
          </p>
          <Button
            type="primary"
            className={`mt-2 !p-4 !font-bold !text-black sm:mt-3 sm:!p-5 ${
              isResendDisabled
                ? "cursor-not-allowed !bg-[#333333] !text-gray-400"
                : "bg-mainColor hover:!bg-mainColorHover"
            }`}
            disabled={isResendDisabled}
            onClick={handleResendOTP}
          >
            Gửi lại OTP
          </Button>
        </form>
      </div>
      {/* Right side */}
      <div className="hidden lg:flex lg:w-[60%] lg:items-center lg:justify-center">
        <img
          src="/main-poster.png"
          alt="main-poster"
          className="h-[95vh] w-[75%]"
        />
      </div>
    </div>
  );
};

export default OTPVerifyPage;

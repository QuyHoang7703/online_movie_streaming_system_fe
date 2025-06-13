/* eslint-disable react-hooks/exhaustive-deps */
import { useNotification } from "@hooks/useNotification";
import { useResendOtpMutation, useVerifyOtpMutation } from "@service/rootApi";
import { Button } from "antd";
import { InputOTP } from "antd-input-otp";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [otpValue, setOtpValue] = useState([]);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
      setIsOtpExpired(true);
    }
  }, [countdown]);

  const [
    resendOtp,
    {
      isError: isResendError,
      error: resendError,
      isSuccess: isResendSuccess,
      isLoading: isResendLoading,
    },
  ] = useResendOtpMutation();

  const [
    verifyOtp,
    {
      isLoading: isVerifyLoading,
      isError: isVerifyError,
      error: verifyError,
      isSuccess: isVerifySuccess,
    },
  ] = useVerifyOtpMutation();

  const handleResendOtp = async () => {
    try {
      // Reset all states first
      setOtpValue([]);
      setIsOtpExpired(false);
      setCountdown(60);
      setIsResendDisabled(true);

      // Send new OTP
      await resendOtp({ email }).unwrap();
    } catch (error) {
      console.log("Resend OTP error:", error);
      // Reset countdown if failed
      setCountdown(0);
      setIsResendDisabled(false);
    }
  };

  const { showNotification } = useNotification();

  useEffect(() => {
    if (isResendSuccess) {
      showNotification("success", "OTP mới đã được gửi đến email của bạn");
    }
    if (isResendError) {
      showNotification("error", "Lỗi", resendError?.data?.message);
    }
  }, [isResendError, isResendSuccess]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleVerifyOtp = (otp) => {
    // Check if OTP is expired
    if (isOtpExpired) {
      showNotification("error", "OTP đã hết hạn, vui lòng gửi lại OTP mới");
      return;
    }

    // Only verify if OTP is exactly 6 digits and all are numeric
    if (otp && otp.length === 6 && /^\d{6}$/.test(otp)) {
      console.log("Verifying OTP:", otp);
      verifyOtp({ email, otp });
    }
  };

  const handleOtpChange = (value) => {
    console.log("OTP onChange:", value, typeof value);
    setOtpValue(value);

    // Handle both array and string formats
    let otpString = "";
    if (Array.isArray(value)) {
      // Filter out empty/undefined values and join
      const filteredValue = value.filter(
        (v) => v !== "" && v !== undefined && v !== null,
      );
      otpString = filteredValue.join("");
    } else if (typeof value === "string") {
      otpString = value;
    }

    console.log("Processed OTP string:", otpString);

    // Only verify when we have exactly 6 valid digits and OTP is not expired
    if (otpString.length === 6 && /^\d{6}$/.test(otpString) && !isOtpExpired) {
      // Add small delay to ensure all input is captured
      setTimeout(() => {
        handleVerifyOtp(otpString);
      }, 100);
    }
  };

  useEffect(() => {
    if (isVerifySuccess) {
      showNotification("success", "OTP đã được xác nhận");
      navigate("/login");
    }
    if (isVerifyError) {
      showNotification("error", "Lỗi", verifyError?.data?.message);
    }
  }, [isVerifyError, isVerifySuccess]);

  return (
    <div className="flex h-screen w-full flex-col justify-between bg-[#1B2431] p-5 lg:flex-row">
      <div className="flex w-full flex-col justify-center p-4 sm:px-8 md:px-12 lg:w-[40%] lg:px-16">
        <div className="mx-auto flex w-full max-w-[350px] flex-col gap-4 sm:gap-5">
          <p className="text-center text-xl font-bold text-white sm:text-2xl">
            Xác nhận OTP
          </p>
          <p className="mt-2 text-sm italic text-white/80 sm:text-base">
            Vui lòng nhập mã OTP đã được gửi đến email {email ? email : "..."}
            của bạn để xác nhận đăng ký tài khoản
          </p>

          <InputOTP
            inputMode="numeric"
            length={6}
            value={otpValue}
            onChange={handleOtpChange}
            loading={isVerifyLoading}
            disabled={isOtpExpired}
          />
          <p className="mt-2 text-sm italic text-white/80 sm:text-base">
            Mã xác nhận có thể đến chậm bạn vui lòng chờ chút nha!
            {countdown > 0 ? (
              <span> Có thể gửi lại sau ({formatTime(countdown)})</span>
            ) : (
              <span className="text-yellow-400">
                {" "}
                Bạn có thể gửi lại OTP ngay bây giờ
              </span>
            )}
          </p>
          <Button
            type="primary"
            className={`mt-2 !p-4 !font-bold !text-black sm:mt-3 sm:!p-5 ${
              isResendDisabled
                ? "cursor-not-allowed !bg-[#333333] !text-gray-400"
                : "bg-mainColor hover:!bg-mainColorHover"
            }`}
            disabled={isResendDisabled || isResendLoading}
            loading={isResendLoading}
            onClick={handleResendOtp}
          >
            {isResendLoading ? "Đang gửi..." : "Gửi lại OTP"}
          </Button>
        </div>
      </div>
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

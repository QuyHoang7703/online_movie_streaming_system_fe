import { useNotification } from "@hooks/useNotification";
import { useForgotPasswordMutation } from "@service/rootApi";
import { Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "@components/FormField";
import InputField from "@components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setLastForgotPasswordRequest } from "@redux/slides/authSlice";
import { Link } from "react-router-dom";

const formSchema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});

const ForgotPassword = () => {
  const [countdown, setCountdown] = useState(null);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const dispatch = useDispatch();

  // Kiểm tra trạng thái rehydrated của Redux Persist
  const persistLoaded =
    useSelector((state) => state._persist?.rehydrated) || false;

  // Lấy toàn bộ map thời gian gửi yêu cầu từ redux
  const lastRequestTimes = useSelector(
    (state) => state.auth.lastForgotPasswordRequests || {},
  );

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  // Sử dụng useRef để lưu email hiện tại thay vì useState
  const emailValue = watch("email") || "";
  const currentEmailRef = useRef(emailValue);

  // Kiểm tra thời gian gửi yêu cầu gần nhất (chỉ khi persist đã load xong)
  useEffect(() => {
    if (!persistLoaded || !emailValue) return;

    currentEmailRef.current = emailValue;

    // Lấy thời gian yêu cầu cho email hiện tại
    const lastRequestTime = lastRequestTimes[emailValue];

    console.log(
      "Email changed or persist loaded:",
      emailValue,
      "lastRequestTime:",
      lastRequestTime,
    );

    if (lastRequestTime) {
      const timeDiff = Math.floor((Date.now() - lastRequestTime) / 1000);
      const remainder = 120 - timeDiff;
      if (remainder > 0) {
        setCountdown(remainder);
        setIsResendDisabled(true);
        console.log({ remainder });
      } else {
        setIsResendDisabled(false);
        setCountdown(null);
      }
    } else {
      setIsResendDisabled(false);
      setCountdown(null);
    }
  }, [lastRequestTimes, persistLoaded, emailValue]);

  // Đếm ngược thời gian
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const handleForgotPassword = async (formData) => {
    try {
      const response = await forgotPassword(formData).unwrap();
      console.log(response);
      showNotification("success", response?.message);
      setCountdown(120);
      setIsResendDisabled(true);
      // Lưu lại thời gian gửi yêu cầu theo email
      dispatch(
        setLastForgotPasswordRequest({
          email: formData.email,
          timestamp: Date.now(),
        }),
      );
    } catch (error) {
      console.log({ error });
      showNotification("error", error?.data?.message);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="flex h-screen w-full flex-col justify-between bg-[#1B2431] p-5 lg:flex-row">
      <form
        className="flex w-full flex-col justify-center p-4 sm:px-8 md:px-12 lg:w-[40%] lg:px-16"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <div className="mx-auto flex w-full max-w-[350px] flex-col gap-4 sm:gap-5">
          <p className="text-center text-xl font-bold text-white sm:text-2xl">
            Quên mật khẩu
          </p>
          <p className="mt-2 text-sm italic text-white/80 sm:text-base">
            Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
          </p>

          <FormField
            control={control}
            name="email"
            Component={InputField}
            placeholder="Nhập email của bạn"
            error={errors?.email?.message}
          />
          {(isSuccess || countdown > 0) && (
            <p className="mt-2 text-sm italic text-white/80 sm:text-base">
              Email có thể đến chậm bạn vui lòng chờ chút nha!
              {countdown > 0 ? (
                <span> Có thể gửi lại sau ({formatTime(countdown)})</span>
              ) : (
                <span> Bạn có thể gửi lại OTP ngay bây giờ</span>
              )}
            </p>
          )}
          <div className="flex justify-end">
            <Link
              to="/login"
              className="text-xs text-mainColor hover:text-mainColorHover sm:text-sm"
            >
              Quay lại đăng nhập
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className={`mt-2 !p-4 !font-bold !text-black sm:mt-3 sm:!p-5 ${
              isResendDisabled
                ? "cursor-not-allowed !bg-[#333333] !text-gray-400"
                : "bg-mainColor hover:!bg-mainColorHover"
            }`}
            disabled={isResendDisabled}
            loading={isLoading}
          >
            Gửi yêu cầu
          </Button>
        </div>
      </form>
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
export default ForgotPassword;

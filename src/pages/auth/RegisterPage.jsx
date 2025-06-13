import { useForm } from "react-hook-form";
import FormField from "@components/FormField";
import { Button } from "antd";
import InputField from "@components/InputField";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "@service/rootApi";
import { useEffect } from "react";
import { useNotification } from "@hooks/useNotification";

const RegisterPage = () => {
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email không được để trống")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không hợp lệ",
      ),
    name: yup.string().required("Tên hiển thị không được để trống"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup
      .string()
      .required("Xác nhận mật khẩu không được để trống")
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [register, { data, isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  const onSubmit = (formData) => {
    console.log({ formDataRegister: formData });
    register(formData);
  };
  if (errors) {
    console.log({ errorsRegisterForm: errors });
  }

  const navigate = useNavigate();
  const { showNotification } = useNotification();
  useEffect(() => {
    if (isSuccess) {
      showNotification("success", "Thông báo", "Đã gửi OTP");
      navigate("/otp-verify", { state: { email: getValues("email") } });
    }
    if (isError) {
      showNotification("error", "Lỗi", error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);
  console.log({ data });

  return (
    <div className="flex h-screen w-full flex-col justify-between bg-[#1B2431] p-5 lg:flex-row">
      {/* Left side */}
      <div className="flex w-full flex-col justify-center p-4 sm:px-8 md:px-12 lg:w-[40%] lg:px-16">
        <div className="mb-4 text-center sm:mb-5">
          <div className="flex items-center justify-center gap-2">
            <p className="text-2xl font-bold text-white sm:text-3xl">
              Welcome to
            </p>
            <img
              src="/emovie-logo.png"
              alt="emovie-logo"
              className="h-[20px] w-auto object-contain align-middle sm:h-[25px]"
            />
          </div>
          <p className="mt-2 text-sm italic text-white/80 sm:text-base">
            Khám phá thế giới điện ảnh không giới hạn
          </p>
        </div>
        <form
          className="mx-auto flex w-full max-w-[350px] flex-col gap-4 sm:gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="email"
            label="Email"
            Component={InputField}
            error={errors?.email?.message}
          />

          <FormField
            control={control}
            name="name"
            label="Tên hiển thị"
            Component={InputField}
            error={errors?.name?.message}
          />

          <FormField
            control={control}
            name="password"
            label="Mât khẩu"
            Component={InputField}
            error={errors?.password?.message}
            type="password"
          />
          <FormField
            control={control}
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            Component={InputField}
            error={errors?.confirmPassword?.message}
            type="password"
          />

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="mt-2 bg-mainColor !p-4 !font-bold !text-black hover:!bg-mainColorHover sm:mt-3 sm:!p-5"
          >
            Đăng ký
          </Button>
        </form>
        <div className="mt-3 text-center text-white sm:mt-4">
          <span className="text-xs sm:text-sm">Bạn đã có tài khoản rồi? </span>
          <Link to="/login" className="font-medium text-mainColor">
            Đăng nhập
          </Link>
        </div>
        <div className="relative mt-5 flex items-center justify-center sm:mt-6">
          <div className="h-[1px] w-full bg-gray-500"></div>
          <span className="absolute bg-[#1B2431] px-2 text-xs text-white sm:text-sm">
            Hoặc
          </span>
        </div>
        <Button
          type="default"
          className="mx-auto mt-6 flex w-full max-w-[350px] items-center justify-center gap-2 !border-gray-500 !bg-transparent !p-5 !text-white hover:!bg-gray-800 sm:mt-7 sm:!p-5"
          icon={
            <img src="/google-logo.png" alt="google-logo" className="h-5 w-5" />
          }
        >
          Đăng nhập bằng Google
        </Button>
      </div>
      {/* Right side - hidden on mobile and tablet */}
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

export default RegisterPage;

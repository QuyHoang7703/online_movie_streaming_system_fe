import { useForm } from "react-hook-form";
import FormField from "@components/FormField";
import { Button } from "antd";
import InputField from "@components/InputField";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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
        <div className="mx-auto flex w-full max-w-[350px] flex-col gap-4 sm:gap-5">
          <FormField
            control={control}
            name="email"
            label="Email"
            Component={InputField}
          />

          <FormField
            control={control}
            name="password"
            label="Mât khẩu"
            Component={InputField}
          />
          <FormField
            control={control}
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            Component={InputField}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="mt-2 bg-mainColor !p-4 !font-bold !text-black hover:!bg-mainColorHover sm:mt-3 sm:!p-5"
          >
            Đăng ký
          </Button>
        </div>
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

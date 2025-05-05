import FormField from "@components/FormField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "@service/rootApi";
import { useNotification } from "@hooks/useNotification";
import InputField from "@components/InputField";
const { Password } = Input;

const formSchema = yup.object().shape({
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .required("Nhập lại mật khẩu không được để trống")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { showNotification } = useNotification();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleResetPassword = async (formData) => {
    try {
      formData = { ...formData, token };
      const response = await resetPassword(formData).unwrap();
      console.log({ response });
      if (response?.message) {
        showNotification("success", response.message);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      // showNotification("error", error.data.message);
      navigate("/reset-password/error", {
        replace: true,
        state: {
          title: "Token đã hết hạn hoặc không hợp lệ",
          description: "Vui lòng thử lại hoặc liên hệ hỗ trợ để được hỗ trợ.",
          image: "/error-image.png",
          actionText: "Quay lại trang đăng nhập",
          actionLink: "/login",
        },
      });
    }
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
        <form
          className="mx-auto flex w-full max-w-[350px] flex-col gap-4 sm:gap-5"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <FormField
            control={control}
            name="password"
            label="Mật khẩu"
            Component={InputField}
            type="password"
            error={errors?.password?.message}
          />
          <FormField
            control={control}
            name="confirmPassword"
            type="password"
            label="Nhập lại mật khẩu"
            Component={InputField}
            error={errors?.confirmPassword?.message}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs text-mainColor hover:text-mainColorHover sm:text-sm"
            >
              Quay lại đăng nhập
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-2 bg-mainColor !p-4 !font-bold !text-black hover:!bg-mainColorHover sm:mt-3 sm:!p-5"
            loading={isLoading}
          >
            Đổi mật khẩu
          </Button>
        </form>
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
export default ResetPassword;

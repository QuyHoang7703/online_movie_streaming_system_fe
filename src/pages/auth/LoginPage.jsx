import { useForm } from "react-hook-form";
import FormField from "@components/FormField";
import { Button, App } from "antd";
import InputField from "@components/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@service/rootApi";
import { useNotification } from "@hooks/useNotification";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { mapErrorMessage } from "@consts/messages";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@redux/slides/authSlice";
import { OAuthConfig } from "@configuration/configuration";
const LoginPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [loginApi, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.fromUrl || "/";
  const onSubmit = async (formData) => {
    try {
      console.log("🚀 Starting login process...");
      const result = await loginApi(formData).unwrap();
      console.log("✅ Login API success:", result);
      console.log("👤 UserInfo received:", result?.data?.userInfo);

      showNotification("success", "Đăng nhập thành công");

      // Dispatch saveUserInfo và log để debug
      console.log("🔄 Dispatching saveUserInfo...");
      dispatch(saveUserInfo(result?.data?.userInfo));

      // Kiểm tra localStorage sau khi dispatch
      setTimeout(() => {
        const persistedState = localStorage.getItem("persist:root");
        console.log("💾 LocalStorage after dispatch:", persistedState);
        if (persistedState) {
          const parsed = JSON.parse(persistedState);
          console.log("📋 Parsed auth state:", parsed.auth);
        }
      }, 100);

      if (result.data.userInfo.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      showNotification("error", mapErrorMessage(error?.data?.message));
    }
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email không được để trống")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không hợp lệ",
      ),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleLoginWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl,
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&prompt=select_account`;

    console.log({ targetUrl });

    window.location.href = targetUrl;
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
            name="password"
            type="password"
            label="Mật khẩu"
            Component={InputField}
            error={errors?.password?.message}
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs text-mainColor hover:text-mainColorHover sm:text-sm"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-2 bg-mainColor !p-4 !font-bold !text-black hover:!bg-mainColorHover sm:mt-3 sm:!p-5"
            loading={isLoading}
          >
            Đăng nhập
          </Button>
        </form>
        <div className="mt-3 text-center text-white sm:mt-4">
          <span className="text-xs sm:text-sm">Bạn chưa có tài khoản? </span>
          <Link to="/register" className="font-medium text-mainColor">
            Đăng ký
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
          onClick={handleLoginWithGoogle}
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

export default LoginPage;

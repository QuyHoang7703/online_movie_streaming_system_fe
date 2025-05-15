import { logout, saveUserInfo } from "@redux/slides/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from "qs";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

const baseQueryForceLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    // Gọi api refresh token
    console.log("Gọi api refresh token");
    const refreshTokenResponse = await baseQuery(
      {
        url: "auth/refresh",
        method: "GET",
        credentials: "include",
      },
      api,
      extraOptions,
    );
    console.log({
      refreshTokenResponse: refreshTokenResponse?.data?.data?.userInfo,
    });
    const userInfo = refreshTokenResponse?.data?.data?.userInfo;
    if (userInfo) {
      api.dispatch(saveUserInfo(userInfo));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // ✅ Gọi trong hàm luôn
      console.log({ result });
      console.log("Force logout");
      // window.location.href = "/login";
      api.dispatch(logout());
    }
  }
  return result;
};

// Tạo ra các reducer
export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryForceLogout,
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "auth/login",
            method: "POST",
            body: { email, password },
          };
        },
      }),
      register: builder.mutation({
        query: ({ email, password, confirmPassword }) => {
          return {
            url: "auth/register",
            method: "POST",
            body: { email, password, confirmPassword },
          };
        },
      }),
      verifyOtp: builder.mutation({
        query: ({ email, otp }) => {
          return {
            url: "auth/verify-otp",
            method: "POST",
            body: { email, otp },
          };
        },
      }),
      resendOtp: builder.mutation({
        query: ({ email }) => {
          return {
            url: "/auth/resend-otp",
            method: "POST",
            params: { email },
          };
        },
      }),
      getAuthUser: builder.query({
        query: () => {
          return {
            url: "auth/get-auth-user",
            method: "GET",
          };
        },
      }),
      logout: builder.mutation({
        query: () => {
          return {
            url: "auth/logout",
            method: "POST",
          };
        },
      }),
      forgotPassword: builder.mutation({
        query: ({ email }) => {
          return {
            url: "auth/forgot-password",
            method: "POST",
            body: { email },
          };
        },
      }),
      verifyToken: builder.query({
        query: ({ token }) => {
          return {
            url: "auth/verify-token",
            params: { token },
          };
        },
      }),
      resetPassword: builder.mutation({
        query: ({ token, password, confirmPassword }) => {
          return {
            url: "auth/reset-password",
            method: "POST",
            body: { token, password, confirmPassword },
          };
        },
      }),
      loginWithGoogle: builder.mutation({
        query: (code) => {
          return {
            url: "auth/oauth2/login/google",
            method: "POST",
            params: { code },
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetAuthUserQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyTokenQuery,
  useResetPasswordMutation,
  useLoginWithGoogleMutation,
} = rootApi;

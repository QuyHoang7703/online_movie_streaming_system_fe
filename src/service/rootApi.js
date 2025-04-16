import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
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
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetAuthUserQuery,
} = rootApi;

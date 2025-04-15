import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
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
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = rootApi;

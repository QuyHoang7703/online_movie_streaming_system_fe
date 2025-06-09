import { rootApi } from "@service/rootApi";

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: (formData) => ({
        url: "/users/update-info",
        method: "PATCH",
        body: formData,
      }),
    }),
    updatePassword: builder.mutation({
      query: (formData) => ({
        url: "/users/update-password",
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateUserInfoMutation, useUpdatePasswordMutation } = userApi;

import { rootApi } from "@service/rootApi";

export const subscriptionPlanApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: ({ page, size }) => ({
        url: "subscription-plans",
        params: { page, size },
      }),
      providesTags: [{ type: "SubscriptionPlans", id: "List" }],
    }),
    createSubscriptionPlan: builder.mutation({
      query: (formData) => ({
        url: "subscription-plans",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "SubscriptionPlans", id: "List" }],
    }),
    getSubscriptionPlanDetail: builder.query({
      query: (subscriptionPlanId) => ({
        url: `subscription-plans/${subscriptionPlanId}`,
      }),
    }),
    getSubscriptionPlanOptions: builder.query({
      query: (currentSubscriptionPlanId) => ({
        url: "subscription-plans/options",
        params: { currentSubscriptionPlanId },
      }),
    }),
    updateSubscriptionPlan: builder.mutation({
      query: ({ subscriptionPlanId, formData }) => ({
        url: `subscription-plans/${subscriptionPlanId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [{ type: "SubscriptionPlans", id: "List" }],
    }),
    deleteSubscriptionPlan: builder.mutation({
      query: (subscriptionPlanId) => ({
        url: `subscription-plans/${subscriptionPlanId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "SubscriptionPlans", id: "List" }],
    }),
    getSubscriptionPlanTree: builder.query({
      query: () => ({
        url: "subscription-plans/tree",
      }),
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useCreateSubscriptionPlanMutation,
  useGetSubscriptionPlanDetailQuery,
  useGetSubscriptionPlanOptionsQuery,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useGetSubscriptionPlanTreeQuery,
} = subscriptionPlanApi;

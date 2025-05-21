import { rootApi } from "@service/rootApi";

export const subscriptionOrderApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayUrl: builder.mutation({
      query: (planDurationId) => ({
        url: "/subscription-orders",
        method: "POST",
        body: { planDurationId },
      }),
    }),
    getSubscriptionOrderDetail: builder.query({
      query: (transactionCode) => ({
        url: `/subscription-orders/transaction-code/${transactionCode}`,
      }),
    }),
    getActiveLatestSubscriptionOrder: builder.query({
      query: (subscriptionPlanId) => ({
        url: "/subscription-orders/active-latest",
        params: { subscriptionPlanId },
      }),
    }),
  }),
});

export const {
  useCreatePayUrlMutation,
  useGetSubscriptionOrderDetailQuery,
  useGetActiveLatestSubscriptionOrderQuery,
} = subscriptionOrderApi;

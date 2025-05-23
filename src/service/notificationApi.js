import { rootApi } from "@service/rootApi";

export const notificationApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page, size }) => ({
        url: `/notifications/me`,
        method: "GET",
        params: { page, size },
        providesTags: (result) =>
          result?.data
            ? [
                ...result.data.map((noti) => ({
                  type: "Notifications",
                  id: noti.id,
                })),
                { type: "Notifications", id: "List" },
              ]
            : [{ type: "Notifications", id: "List" }],
      }),
    }),
    updateStatusNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Notifications", id: "List" }],
      // invalidatesTags: (result, error, id) => [{ type: "Notifications", id }],
    }),
    markAllAsSeen: builder.mutation({
      query: () => ({
        url: "/notifications/mark-all-seen",
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Notifications", id: "List" }],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateStatusNotificationMutation,
  useMarkAllAsSeenMutation,
} = notificationApi;

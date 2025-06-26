import { rootApi } from "@service/rootApi";

export const userInteractionApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInteraction: builder.query({
      query: (movieId) => ({
        url: `/user-interactions/movie/${movieId}`,
      }),
    }),
    createUserInteraction: builder.mutation({
      query: ({ ratingValue, movieId }) => ({
        url: "/user-interactions",
        method: "POST",
        body: { ratingValue, movieId },
      }),
    }),
    updateUserInteraction: builder.mutation({
      query: ({ ratingValue, movieId }) => ({
        url: `/user-interactions`,
        method: "PATCH",
        body: { ratingValue, movieId },
      }),
    }),
    getHistoryView: builder.query({
      query: ({ page = 1, size = 18 }) => ({
        url: `/user-interactions/history-view`,
        params: { page, size },
      }),
      providesTags: [{ type: "HistoryView", id: "List" }],
    }),
    addHistoryView: builder.mutation({
      query: ({ movieId }) => ({
        url: `/user-interactions/history-view`,
        method: "POST",
        body: { movieId },
      }),
      invalidatesTags: [{ type: "HistoryView", id: "List" }],
    }),
  }),
});

export const {
  useGetUserInteractionQuery,
  useCreateUserInteractionMutation,
  useUpdateUserInteractionMutation,
  useGetHistoryViewQuery,
  useAddHistoryViewMutation,
} = userInteractionApi;

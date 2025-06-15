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
  }),
});

export const {
  useGetUserInteractionQuery,
  useCreateUserInteractionMutation,
  useUpdateUserInteractionMutation,
} = userInteractionApi;

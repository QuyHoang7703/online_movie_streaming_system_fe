import { rootApi } from "@service/rootApi";

export const commentApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ movieId, page = 1, size = 10 }) => ({
        url: `/comments/${movieId}`,
        params: { page, size },
      }),
      providesTags: [{ type: "Comment", id: "LIST" }],
    }),
    createComment: builder.mutation({
      query: ({ movieId, comment }) => ({
        url: `/comments/${movieId}`,
        body: comment,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;

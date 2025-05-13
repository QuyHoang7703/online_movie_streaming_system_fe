import { rootApi } from "@service/rootApi";

export const videoVersionApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoVersion: builder.query({
      query: (movieId) => ({
        url: `movies/${movieId}/video-versions`,
        method: "GET",
      }),
    }),
    createVideoVersion: builder.mutation({
      query: ({ movieId, videoType }) => ({
        url: `movies/${movieId}/video-versions`,
        method: "POST",
        body: { videoType },
      }),
    }),
    deleteVideoVersion: builder.mutation({
      query: (videoVersionId) => ({
        url: `movies/video-versions/${videoVersionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetVideoVersionQuery,
  useCreateVideoVersionMutation,
  useDeleteVideoVersionMutation,
} = videoVersionApi;

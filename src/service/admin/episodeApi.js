// /* eslint-disable no-unused-labels */
import { rootApi } from "@service/rootApi";

export const episodeApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query({
      query: ({ seriesMovieId, page, size }) => ({
        url: `/series-movie/${seriesMovieId}/episodes`,
        params: { page, size },
      }),
      providesTags: [{ type: "Episodes", id: "LIST" }],
    }),
    createEpisode: builder.mutation({
      query: ({ seriesMovieId, episodeInfo, video }) => {
        const formData = new FormData();
        formData.append(
          "episodeInfo",
          new Blob([JSON.stringify(episodeInfo)], { type: "application/json" }),
        );
        if (video) {
          formData.append("video", video);
        }
        return {
          url: `/series-movie/${seriesMovieId}/episodes`,
          method: "POST",
          body: formData,
          // Bỏ headers hoặc để undefined, để browser tự thêm boundary cho formData
          formData: true, // Quan trọng! Báo RTK Query biết đây là FormData
        };
      },
      invalidatesTags: [{ type: "Episodes", id: "LIST" }],
    }),
    getDetailEpisode: builder.query({
      query: (episodeId) => ({
        url: `/episodes/${episodeId}`,
      }),
      providesTags: (result, error, episodeId) => [
        { type: "Episodes", id: episodeId },
      ],
    }),
    updateEpisode: builder.mutation({
      query: ({ episodeId, episodeInfo, video }) => {
        const formData = new FormData();
        formData.append(
          "episodeInfo",
          new Blob([JSON.stringify(episodeInfo)], { type: "application/json" }),
        );
        if (video) {
          formData.append("video", video);
        }
        return {
          url: `/episodes/${episodeId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Episodes", id: arg.episodeId },
        { type: "Episodes", id: "LIST" },
      ],
    }),
    deleteEpisode: builder.mutation({
      query: (episodeId) => ({
        url: `/episodes/${episodeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Episodes", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useCreateEpisodeMutation,
  useGetDetailEpisodeQuery,
  useUpdateEpisodeMutation,
  useDeleteEpisodeMutation,
} = episodeApi;

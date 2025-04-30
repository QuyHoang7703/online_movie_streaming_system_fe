/* eslint-disable no-unused-labels */
import { rootApi } from "@service/rootApi";

export const episodeApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    getEpisodes: builder.query({
      query: ({ seriesMovieId, page, size }) => ({
        url: `/series-movies/${seriesMovieId}/episodes`,
        params: { page, size },
      }),
    });
    createEpisode: builder.mutation({
      query: ({ seriesMovieId, formData }) => ({
        url: `/series-movies/${seriesMovieId}/episodes`,
        method: "POST",
        body: formData,
      }),
    });
    getDetailEpisode: builder.query({
      query: (episodeId) => ({
        url: `/episodes/${episodeId}`,
      }),
    });
    updateEpisode: builder.mutation({
      query: ({ episodeId, formData }) => ({
        url: `/episodes/${episodeId}`,
        method: "PATCH",
        body: formData,
      }),
    });
    deleteEpisode: builder.mutation({
      query: (episodeId) => ({
        url: `/episodes/${episodeId}`,
        method: "DELETE",
      }),
    });
  },
});

export const {
  useGetEpisodesQuery,
  useCreateEpisodeMutation,
  useGetDetailEpisodeQuery,
  useUpdateEpisodeMutation,
  useDeleteEpisodeMutation,
} = episodeApi;

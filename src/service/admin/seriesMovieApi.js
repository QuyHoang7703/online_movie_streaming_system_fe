import { rootApi } from "@service/rootApi";

export const seriesMovieApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSeriesMovieDetail: builder.query({
        query: (movieId) => ({
          url: `series-movie/${movieId}`,
        }),
        providesTags: (result, error, movieId) => [
          { type: "SeriesMovie", id: movieId },
        ],
      }),
      createSeriesMovie: builder.mutation({
        query: (formData) => {
          return {
            url: "/series-movie",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: [{ type: "Movies", id: "List" }],
      }),
      updateSeriesMovie: builder.mutation({
        query: ({ movieId, formData }) => ({
          url: `series-movie/${movieId}`,
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: (result, error, { movieId }) => [
          { type: "SeriesMovie", id: movieId },
          { type: "Movies", id: "List" },
        ],
      }),
    };
  },
});

export const {
  useGetSeriesMovieDetailQuery,
  useCreateSeriesMovieMutation,
  useUpdateSeriesMovieMutation,
} = seriesMovieApi;

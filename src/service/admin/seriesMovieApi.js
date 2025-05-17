import { rootApi } from "@service/rootApi";

export const seriesMovieApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
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
      getSeriesMovieDetail: builder.query({
        query: (movieId) => ({
          url: `series-movie/${movieId}`,
        }),
        providesTags: (result, error, movieId) => [
          { type: "MovieDetail", id: movieId },
        ],
      }),
      updateSeriesMovie: builder.mutation({
        query: ({ movieId, formData }) => ({
          url: `series-movie/${movieId}`,
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: (result, error, { movieId }) => [
          { type: "MovieDetail", id: movieId },
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

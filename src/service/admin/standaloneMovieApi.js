import { rootApi } from "@service/rootApi";

export const standaloneMovieApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createStandaloneMovie: builder.mutation({
        query: (formData) => {
          return {
            url: "/standalone-movies",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: [{ type: "Movies", id: "List" }],
      }),
      getStandaloneMovieDetail: builder.query({
        query: (movieId) => ({
          url: `standalone-movies/${movieId}`,
        }),
        providesTags: (result, error, movieId) => [
          { type: "MovieDetail", id: movieId },
        ],
      }),
      updateStandaloneMovie: builder.mutation({
        query: ({ movieId, formData }) => ({
          url: `standalone-movies/${movieId}`,
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
  useCreateStandaloneMovieMutation,
  useGetStandaloneMovieDetailQuery,
  useUpdateStandaloneMovieMutation,
} = standaloneMovieApi;

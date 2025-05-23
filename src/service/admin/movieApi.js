import { rootApi } from "@service/rootApi";

export const movieApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({
        title,
        genreNames,
        movieType,
        countries,
        page,
        size,
      } = {}) => ({
        url: "/movies",
        method: "GET",
        params: { title, genreNames, movieType, countries, page, size },
      }),
      providesTags: [{ type: "Movies", id: "List" }],
    }),
    getCountriesOfMovies: builder.query({
      query: () => ({
        url: "/movies/countries",
        method: "GET",
      }),
    }),
    deleteMovie: builder.mutation({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Movies", id: "List" }],
    }),
    getMovieForUser: builder.query({
      query: ({ title, genreNames, countries, page, size, movieType }) => ({
        url: "/user/movies",
        method: "GET",
        params: { title, genreNames, countries, page, size, movieType },
      }),
      providesTags: [{ type: "MoviesUser", id: "List" }],
    }),
    canUserWatchMovie: builder.query({
      query: (movieId) => ({
        url: `/user/movies/${movieId}/can-watch`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetCountriesOfMoviesQuery,
  useDeleteMovieMutation,
  useGetMovieForUserQuery,
  useLazyCanUserWatchMovieQuery,
} = movieApi;

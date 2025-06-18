import { rootApi } from "@service/rootApi";

export const favoriteMovieApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavoriteMovie: builder.mutation({
      query: (movieId) => ({
        url: `/favorite-movies`,
        method: "POST",
        params: { movieId },
      }),
      invalidatesTags: (result, error, movieId) => [
        { type: "MoviesUser", id: "List" },
        { type: "MovieDetail", id: movieId },
        { type: "HomePageMovies", id: "List" },
      ],
    }),
    removeFavoriteMovie: builder.mutation({
      query: (movieId) => ({
        url: `/favorite-movies/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, movieId) => [
        { type: "MoviesUser", id: "List" },
        { type: "MovieDetail", id: movieId },
        { type: "HomePageMovies", id: "List" },
      ],
    }),
    getFavoriteMovies: builder.query({
      query: ({ page, size }) => ({
        url: `/favorite-movies`,
        params: { page, size },
      }),
      providesTags: [{ type: "MoviesUser", id: "List" }],
    }),
  }),
});

export const {
  useAddFavoriteMovieMutation,
  useRemoveFavoriteMovieMutation,
  useGetFavoriteMoviesQuery,
} = favoriteMovieApi;

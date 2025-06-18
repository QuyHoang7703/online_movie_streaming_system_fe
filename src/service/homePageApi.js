import { rootApi } from "@service/rootApi";

export const homePageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotMoviesByFilter: builder.query({
      query: ({ size = 10, movieType, country }) => ({
        url: "/home-page/hot-movies",
        params: {
          size,
          movieType,
          country,
        },
      }),
      providesTags: [{ type: "HomePageMovies", id: "List" }],
    }),
    getFeatureMovies: builder.query({
      query: ({ size = 6 }) => ({
        url: "/home-page/feature-movies",
        params: {
          size,
        },
      }),
      providesTags: [{ type: "HomePageMovies", id: "List" }],
    }),
  }),
});

export const { useGetHotMoviesByFilterQuery, useGetFeatureMoviesQuery } =
  homePageApi;

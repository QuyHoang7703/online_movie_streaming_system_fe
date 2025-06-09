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
    }),
  }),
});

export const { useGetHotMoviesByFilterQuery } = homePageApi;

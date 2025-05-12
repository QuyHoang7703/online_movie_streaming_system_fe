import { rootApi } from "@service/rootApi";

export const countryApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "/countries",
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;

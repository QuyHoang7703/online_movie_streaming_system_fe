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
      }),
    };
  },
});

export const { useCreateStandaloneMovieMutation } = standaloneMovieApi;

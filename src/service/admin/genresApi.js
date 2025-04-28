import { rootApi } from "@service/rootApi";

export const genreApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getGenres: builder.query({
        query: ({ genreName, page, size } = {}) => {
          return {
            url: "/genres",
            method: "GET",
            params: { genreName, page, size },
          };
        },
        providesTags: [{ type: "Genres", id: "List" }],
      }),
      createGenre: builder.mutation({
        query: ({ name, description }) => {
          return {
            url: "genres",
            method: "POST",
            body: {
              name,
              description,
            },
          };
        },
        invalidatesTags: [{ type: "Genres", id: "List" }],
      }),
      getGenreById: builder.query({
        query: (id) => {
          return {
            url: `/genres/${id}`,
            method: "GET",
          };
        },
      }),
      updateGenre: builder.mutation({
        query: ({ genreId, name, description }) => {
          return {
            url: `/genres/${genreId}`,
            method: "PATCH",
            body: { name, description },
          };
        },
        invalidatesTags: [{ type: "Genres", id: "List" }],
      }),
      deleteGenre: builder.mutation({
        query: (genreId) => {
          return {
            url: `/genres/${genreId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [{ type: "Genres", id: "List" }],
      }),
      getAllGenres: builder.query({
        query: () => {
          return {
            url: "/genres/all",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetGenresQuery,
  useCreateGenreMutation,
  useGetGenreByIdQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenresQuery,
} = genreApi;

import { rootApi } from "@service/rootApi";

export const actorApi = rootApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getActors: builder.query({
        query: ({ actorName, page, size } = {}) => {
          return {
            url: "/actors",
            method: "GET",
            params: { actorName, page, size },
          };
        },
        providesTags: [{ type: "Actors", id: "List" }],
      }),
      createActor: builder.mutation({
        query: (formData) => ({
          url: "/actors",
          method: "POST",
          body: formData,
        }),
        invalidatesTags: [{ type: "Actors", id: "List" }],
      }),
      updateActor: builder.mutation({
        query: ({ actorId, formData }) => ({
          url: `/actors/${actorId}`,
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: [{ type: "Actors", id: "List" }],
      }),
      getDetailActor: builder.query({
        query: ({ actorId }) => ({
          url: `/actors/${actorId}`,
          method: "GET",
        }),
      }),
      deleteActor: builder.mutation({
        query: ({ actorId }) => ({
          url: `/actors/${actorId}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Actors", id: "List" }],
      }),
    };
  },
});

export const {
  useGetActorsQuery,
  useCreateActorMutation,
  useUpdateActorMutation,
  useGetDetailActorQuery,
  useLazyGetActorsQuery,
  useDeleteActorMutation,
} = actorApi;

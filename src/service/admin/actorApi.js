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
      }),
      createActor: builder.mutation({
        query: (formData) => ({
          url: "/actors",
          method: "POST",
          body: formData,
        }),
      }),
      updateActor: builder.mutation({
        query: ({ actorId, formData }) => ({
          url: `/actors/${actorId}`,
          method: "PATCH",
          body: formData,
        }),
      }),
      getDetailActor: builder.query({
        query: ({ actorId }) => ({
          url: `/actors/${actorId}`,
          method: "GET",
        }),
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
} = actorApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + "/api/v1",
  }),

  tagTypes: ["Roles"],

  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/roles",
      providesTags: ["Roles"],
    }),

    createRoles: builder.mutation({
      query: (newRole) => ({
        method: "POST",
        url: "/roles",
        body: newRole,
      }),
      invalidatesTags: ["Roles"],
    }),

    updateRoles: builder.mutation({
      query: ({ id, updateRole }) => ({
        method: "PUT",
        url: `/roles/${id}`,
        body: updateRole,
      }),
      invalidatesTags: ["Roles"],
    }),

    deleteRoles: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/roles/${id}`,
      }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRolesMutation,
  useUpdateRolesMutation,
  useDeleteRolesMutation,
} = roleApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({
    //ToDo move the base path url to the env variables
    baseUrl: 'http://54.163.17.76:8072/api/v1'
  }),
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => '/properties',
    }),
    getPropertiesById: builder.query({
      query: (id) => `/properties/${id}`,
    }),
    createProperties: builder.mutation({
      query: (newProperties) => ({
        method: 'POST',
        url: '/properties', 
        body: newProperties,
      }),
    }),
    updateProperties: builder.mutation({
      query: ({ id, updateProperties }) => ({
        method: 'PUT',
        url: `/properties/${id}`,
        body: updateProperties,
      }),
    }),
    deleteProperties: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/properties/${id}`,
      }),
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertiesByIdQuery,
  useCreatePropertiesMutation,
  useUpdatePropertiesMutation,
  useDeletePropertiesMutation,
} = propertiesApi;

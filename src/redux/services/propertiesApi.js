import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({
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
    uploadImageProperties: builder.mutation({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('filename', file.name);
        return {
          method: 'POST',
          url: `/properties/upload`, 
          body: formData,
        };
      },
    }),
    
  
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertiesByIdQuery,
  useCreatePropertiesMutation,
  useUpdatePropertiesMutation,
  useDeletePropertiesMutation,
  useUploadImagePropertiesMutation
} = propertiesApi;

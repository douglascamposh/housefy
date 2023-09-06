import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({
    //ToDo move the base path url to the env variables
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api/v1'
  }),

  tagTypes: ["Properties"],

  endpoints: (builder) => ({
    
    getProperties: builder.query({
      query: () => '/properties',
      providesTags: ["Properties"],
    }),

    getPropertiesById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: ["Properties"],
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
      invalidatesTags: ["Properties"],
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

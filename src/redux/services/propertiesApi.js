import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const propertiesApi = createApi({
  reducerPath: 'propertiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api/v1'
  }),

  tagTypes: ["Properties", "SubProperties"],

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
    deleteImages: builder.mutation({
      query: (imageId) => ({
        method: 'DELETE',
        url: `/properties/delete/${imageId}`,
      }),
    }),

    createSubProperties: builder.mutation({
      query: ({id,newSubProperties}) => ({
        method: 'POST',
        url: `/properties/${id}/subproperties`,
        body: newSubProperties,
      }),
    }),
    getSubProperties: builder.query({
      query: (id) => `/properties/${id}/subproperties`,
      providesTags: ['SubProperties'],

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

    createSaleProperty: builder.mutation({
      query: (newSaleProperty) => ({
        method: 'POST',
        url: '/sales',
        body: newSaleProperty,
      }),
      invalidatesTags: ['SubProperties'],
    }),

  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertiesByIdQuery,
  useCreatePropertiesMutation,
  useUpdatePropertiesMutation,
  useDeletePropertiesMutation,
  useDeleteImagesMutation,
  useCreateSubPropertiesMutation,
  useGetSubPropertiesQuery,
  useUploadImagePropertiesMutation,
  useCreateSalePropertyMutation,
} = propertiesApi;

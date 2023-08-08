import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery(
      { baseUrl: 'http://localhost:8072/api/' }),
    endpoints: (builder) => ({
      getPosts:builder.query({
          query:()=>'v1/properties',
      }),
    }),
  });
export const { useGetPostsQuery} = propertiesApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + '/api/v1/auth'
  }),

  // tagTypes: ["signUp"],

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (signUp) => ({
        url: '/signUp',
        method: 'POST',
        body: signUp,
      }),
    }),
    logIn: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: "/logIn",
        body: credentials,
      }),
    }),
  })
});

export const {
  useSignUpMutation, 
  useLogInMutation,
} = authApi;

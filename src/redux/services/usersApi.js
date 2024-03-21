import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: NEXT_PUBLIC_BASE_URL + "/api/v1",
  }),
  
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
        query: () => "/users",
        //providesTags: ["Users"],
    })
  }),
});

export const {useGetUsersQuery} = usersApi;

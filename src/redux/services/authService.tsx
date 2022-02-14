import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const baseUrl = `https://ovatalk.herokuapp.com`;
// const baseUrl = `http://192.168.43.88:5000`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['Auth', 'Users'],
  endpoints: builder => ({
    login: builder.mutation({
      query: user => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: user => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.query({
      query: () => '/api/v1/auth/logout',
      providesTags: ['Auth'],
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutQuery} = authApi;

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const baseUrl = `http://localhost:5000`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation({
      query: user => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
    register: builder.mutation({
      query: user => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;

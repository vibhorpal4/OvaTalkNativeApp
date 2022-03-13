import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

// const baseUrl: any = {API_URL};

const baseUrl = `https://ovatalk.herokuapp.com`;

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
      invalidatesTags: ['Auth', 'Users'],
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

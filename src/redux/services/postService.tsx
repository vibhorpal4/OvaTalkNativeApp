import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const baseUrl = `https://ovatalk.herokuapp.com`;
// const baseUrl = `http://192.168.43.88:5000`;

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const getToken = async () => {
        try {
          const authToken = await AsyncStorage.getItem('@token');
          return authToken;
        } catch (error) {
          console.log(error);
        }
      };
      const token = await getToken();
      headers.set('content-type', 'multipart/form-data');
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Posts'],
  endpoints: builder => ({
    uploadPost: builder.mutation({
      query: post => ({
        url: '/api/v1/posts/create',
        method: 'POST',
        body: post,
      }),
    }),
    getPost: builder.query({
      query: id => `/api/v1/posts/${id}`,
      providesTags: ['Posts'],
    }),
    getAllPosts: builder.query({
      query: () => `/api/v1/posts`,
      providesTags: ['Posts'],
    }),
  }),
});

export const {useUploadPostMutation, useGetPostQuery} = postApi;

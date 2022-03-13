import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = `https://ovatalk.herokuapp.com`;

export const commentApi = createApi({
  reducerPath: 'commentApi',
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
  tagTypes: ['Comments'],
  endpoints: builder => ({
    getPostComments: builder.query({
      query: id => `/api/v1/post/comments/${id}/comments`,
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation({
      query: ({id, title}) => ({
        url: `/api/v1/post/comments/${id}/create`,
        method: 'POST',
        body: title,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `/api/v1/post/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

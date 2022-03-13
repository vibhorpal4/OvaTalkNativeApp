import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

// const baseUrl: any = {API_URL};
const baseUrl = `https://ovatalk.herokuapp.com`;

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
      invalidatesTags: ['Posts'],
    }),
    getPost: builder.query({
      query: id => `/api/v1/posts/${id}`,
      // providesTags: (result, error, id) => [{type: 'Posts', id}],
      providesTags: ['Posts'],
    }),
    getAllPosts: builder.query({
      query: () => `/api/v1/posts`,
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({id}: any) => ({type: 'Posts' as const, id}))]
      //     : ['Posts'],
      providesTags: ['Posts'],
    }),
    getTimeLinePosts: builder.query({
      query: () => `/api/v1/posts/timeline/post`,
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({id}: any) => ({type: 'Posts' as const, id}))]
      //     : ['Posts'],
      providesTags: ['Posts'],
    }),
    likePost: builder.mutation({
      query: id => ({
        url: `/api/v1/posts/like/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `/api/v1/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    editPost: builder.mutation({
      query: ({id, caption}) => ({
        url: `/api/v1/posts/${id}`,
        method: 'PUT',
        body: caption,
      }),
      invalidatesTags: ['Posts'],
    }),
    savePost: builder.mutation({
      query: id => ({
        url: `/api/v1/posts/${id}/save`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'],
    }),
    getSavedPosts: builder.query({
      query: () => `/api/v1/posts/saved/posts`,
      providesTags: ['Posts'],
    }),
  }),
});

export const {
  useUploadPostMutation,
  useGetPostQuery,
  useGetTimeLinePostsQuery,
  useLikePostMutation,
  useGetAllPostsQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useSavePostMutation,
  useGetSavedPostsQuery,
} = postApi;

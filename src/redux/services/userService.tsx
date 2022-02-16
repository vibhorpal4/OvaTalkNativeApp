import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const baseUrl = `https://ovatalk.herokuapp.com`;
// const baseUrl = `http://192.168.43.88:5000`;

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['Users', 'Followers', 'Followings'],
  endpoints: builder => ({
    getMyProfile: builder.query({
      query: () => '/api/v1/users/profile',
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({user, username}) => ({
        url: `/api/v1/users/user/${username}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    getUser: builder.query({
      query: username => `/api/v1/users/user/${username}`,
      providesTags: ['Users'],
    }),
    getUserFollowers: builder.query({
      query: username => `/api/v1/users/user/${username}/followers`,
      providesTags: ['Followers', 'Followings', 'Users'],
    }),
    getUserFollowings: builder.query({
      query: username => `/api/v1/users/user/${username}/followings`,
      providesTags: ['Followings', 'Followers', 'Users'],
    }),
    followUser: builder.mutation({
      query: username => ({
        url: `/api/v1/users/user/${username}/follow`,
        method: 'PUT',
      }),
      invalidatesTags: ['Followers', 'Followings', 'Users'],
    }),
    unFollowUser: builder.mutation({
      query: username => ({
        url: `/api/v1/users/user/${username}/unfollow`,
        method: 'PUT',
      }),
      invalidatesTags: ['Followers', 'Followings', 'Users'],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetUserQuery,
  useGetMyProfileQuery,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = userApi;

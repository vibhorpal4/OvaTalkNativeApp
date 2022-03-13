import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

// const baseUrl: any = {API_URL};

const baseUrl = `https://ovatalk.herokuapp.com`;

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
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({id}: any) => ({type: 'Users' as const, id}))]
      //     : ['Users'],
      providesTags: ['Users'],
    }),
    getUserFollowings: builder.query({
      query: username => `/api/v1/users/user/${username}/followings`,
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({id}: any) => ({type: 'Users' as const, id}))]
      //     : ['Users'],
      providesTags: ['Users'],
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
    getUserByID: builder.query({
      query: id => `/api/v1/users/user/id/${id}`,
      // providesTags: (result, error, id) => [{type: 'Users', id}],
      providesTags: ['Users'],
    }),
    searchUser: builder.query({
      query: user => `/api/v1/users?q=${user}`,
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({id}: any) => ({type: 'Users' as const, id}))]
      //     : ['Users'],
      providesTags: ['Users'],
    }),
    getUserNotifications: builder.query({
      query: () => `/api/v1/users/user/my/notifications`,
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetUserQuery,
  useSearchUserQuery,
  useGetMyProfileQuery,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useGetUserByIDQuery,
  useGetUserNotificationsQuery,
} = userApi;

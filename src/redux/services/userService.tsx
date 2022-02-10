import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

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
  tagTypes: ['Users'],
  endpoints: builder => ({
    updateUser: builder.mutation({
      query: ({user, username}) => ({
        url: `/api/v1/users/user/${username}`,
        method: 'PUT',
        body: user,
      }),
    }),
    getUser: builder.query({
      query: username => `/api/v1/users/user/${username}`,
      providesTags: ['Users'],
    }),
  }),
});

export const {useUpdateUserMutation} = userApi;

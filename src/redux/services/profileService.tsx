import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

const baseUrl = `https://ovatalk.herokuapp.com`;
// const baseUrl = `http://172.20.10.7:5000`;

export const profileApi = createApi({
  reducerPath: 'profileApi',
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
  tagTypes: ['Profile'],
  endpoints: builder => ({
    getMyProfile: builder.query({
      query: () => '/api/v1/users/profile',
      providesTags: ['Profile'],
    }),
  }),
});

export const {useGetMyProfileQuery} = profileApi;

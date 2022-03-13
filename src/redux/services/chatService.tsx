import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = `https://ovatalk.herokuapp.com`;

export const chatApi = createApi({
  reducerPath: 'chatApi',
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
  tagTypes: ['Chats'],
  endpoints: builder => ({
    createChat: builder.mutation({
      query: id => ({
        url: `/api/v1/chats/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Chats'],
    }),
    getAllChats: builder.query({
      query: () => `/api/v1/chats`,
      providesTags: ['Chats'],
    }),
  }),
});

export const {useCreateChatMutation, useGetAllChatsQuery} = chatApi;

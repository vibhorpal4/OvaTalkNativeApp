import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = `https://ovatalk.herokuapp.com`;

export const messageApi = createApi({
  reducerPath: 'messageApi',
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
  tagTypes: ['Message'],
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: ({id, body}) => ({
        url: `/api/v1/messages/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Message'],
    }),
    getAllMessagesOfChat: builder.query({
      query: id => `/api/v1/chats/${id}`,
      providesTags: ['Message'],
    }),
  }),
});

export const {useSendMessageMutation, useGetAllMessagesOfChatQuery} =
  messageApi;

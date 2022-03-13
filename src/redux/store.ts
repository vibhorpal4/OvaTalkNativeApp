import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {authApi} from './services/authService'
import { postApi } from "./services/postService";
import { userApi } from "./services/userService";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import postsSlice from "./postsSlice";
import notificationSlice from "./notificationSlice";
import { commentApi } from "./services/commentServices";
import { messageApi } from "./services/messageService";
import { chatApi } from "./services/chatService";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}


const reducers: any = combineReducers({
  auth: persistReducer(persistConfig, authSlice),
  // posts: persistReducer(persistConfig, postsSlice),
  posts: postsSlice,
  notifications: notificationSlice,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer
})



const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(  {serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      
      }}).concat([authApi.middleware,  postApi.middleware, userApi.middleware, commentApi.middleware, messageApi.middleware, chatApi.middleware])
})

export const persistor = persistStore(store)

export default store
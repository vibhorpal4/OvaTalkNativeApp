import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import {authApi} from './services/authService'
import { postApi } from "./services/postService";
import { userApi } from "./services/userService";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice,
        profile: profileSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([authApi.middleware,  postApi.middleware, userApi.middleware])
})

export default store
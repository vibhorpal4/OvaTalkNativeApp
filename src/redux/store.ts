import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import {authApi} from './services/authService'
import { postApi } from "./services/postService";
import { profileApi } from "./services/profileService";
import { userApi } from "./services/userService";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([authApi.middleware, profileApi.middleware, postApi.middleware, userApi.middleware])
})

export default store
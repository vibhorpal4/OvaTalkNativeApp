import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {authApi} from './services/authService'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([authApi.middleware])
})

export default store
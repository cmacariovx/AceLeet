import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import localStorageMiddleware from './middleware/localStorageMiddleware';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store;

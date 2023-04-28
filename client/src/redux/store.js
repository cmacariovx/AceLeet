import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import localStorageMiddleware from './middleware/localStorageMiddleware';

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store;

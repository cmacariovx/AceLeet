import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import recommendationsSlice from './slices/recommendationsSlice';
import resetMiddleware from './middleware/resetMiddleware';
import localStorageMiddleware from './middleware/localStorageMiddleware';

const rootReducer = resetMiddleware({
    auth: authSlice,
    user: userSlice,
    recommendations: recommendationsSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;

// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import recommendationsSlice from './slices/recommendationsSlice';
import resetMiddleware from './middleware/resetMiddleware';
import localStorageMiddleware from './middleware/localStorageMiddleware';

const rootReducer = {
  auth: authSlice,
  user: userSlice,
  recommendations: recommendationsSlice,
};

const combinedReducer = resetMiddleware(rootReducer);

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

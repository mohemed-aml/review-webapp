// frontend/src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authModalReducer from './slices/authModalSlice';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    books: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export default store;
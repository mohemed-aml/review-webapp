// frontend/src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import authModalReducer from './slices/authModalSlice';
import bookReducer from './slices/bookSlice';
import { useDispatch } from 'react-redux';

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
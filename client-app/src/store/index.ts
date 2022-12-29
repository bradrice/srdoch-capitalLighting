import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { levelSlice } from './level';

export const store = configureStore({
  reducer: {
    level: levelSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

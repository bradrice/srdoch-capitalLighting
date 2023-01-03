import { configureStore } from '@reduxjs/toolkit';
import { levelSlice } from './level';
import { controlSlice } from './control';
import { progressSlice } from './progress';

export const store = configureStore({
  reducer: {
    level: levelSlice.reducer,
    control: controlSlice.reducer,
    progress: progressSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


export default store;

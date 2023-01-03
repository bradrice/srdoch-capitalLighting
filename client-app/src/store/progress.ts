import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface iProgress {
  currentId: string;
}

export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    currentId: ''
  },
  reducers: {
    setCurrentId: (state, action: PayloadAction<string>) => {
      state = { currentId: action.payload };
      return state;
    }
  }
})

export const { setCurrentId } = progressSlice.actions

export default progressSlice.reducer

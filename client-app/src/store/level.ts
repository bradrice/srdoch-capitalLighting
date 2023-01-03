import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const levelSlice = createSlice({
  name: 'level',
  initialState: 0,
  reducers: {
    increment: state => {
      state += 1
    },
    decrement: state => {
      state -= 1
    },
    incrementByAmount: (state, action: PayloadAction<string | number>) => {
      typeof action.payload === 'string' ? state += parseInt(action.payload) : state += action.payload;
    },
    setLevelByValue: (state, action: PayloadAction<number>) => {
      state = action.payload;
      return state;
    }
  }
})

export const { increment, decrement, incrementByAmount, setLevelByValue } = levelSlice.actions;

export default levelSlice.reducer;

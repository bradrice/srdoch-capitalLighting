import { createSlice } from '@reduxjs/toolkit'

export const levelSlice = createSlice({
  name: 'level',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += parseInt(action.payload)
    },
    setLevelByValue: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, setLevelByValue } = levelSlice.actions

export default levelSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export interface iOption {
  optionId: number;
  optionValue: string;
}

export interface iQuestion {
  questionId: number;
  questionText: string;
  options: iOption[];
}

export const levelSlice = createSlice({
  name: 'level',
  initialState: {
    value: {
      level: 0,
      control: []
    }
  },
  reducers: {
    setFormLevelValue: (state, action) => {
      state.value = { level: action.payload.level, control: action.payload.control }
    }
  }
})

export const { setFormLevelValue } = levelSlice.actions

export default levelSlice.reducer

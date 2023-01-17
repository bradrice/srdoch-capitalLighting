import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { iRow } from '../types'

export interface iProgress {
  auditId: string;
  savedRowControls: iRow[];
}

const initialState: iProgress = { auditId: '', savedRowControls: [] };

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setAuditId: (state, action: PayloadAction<string>) => {
      state = { ...state, auditId: action.payload };
      return state;
    },
    setRowControls: (state, action: PayloadAction<iRow[]>) => {
      state = { ...state, savedRowControls: action.payload };
      return state;
    }
  }
})

export const { setAuditId, setRowControls } = progressSlice.actions

export default progressSlice.reducer

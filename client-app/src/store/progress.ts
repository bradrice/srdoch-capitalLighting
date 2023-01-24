import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface iProgress {
  auditId: string;
  pageId: string;
  controlOrder: string[];
  savedControls: Record<string, string>;
  savedControlValues: Record<string, string>;
}

const initialState: iProgress = {auditId: '', pageId: '', controlOrder: [], savedControls: {}, savedControlValues: {}};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setAuditId: (state, action: PayloadAction<string>) => {
      // state = { ...state[action.payload] = [] };
      return state;
    },
    setPageItems: (state, action: PayloadAction<iProgress>) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    }
  }
})

export const { setAuditId, setPageItems } = progressSlice.actions

export default progressSlice.reducer

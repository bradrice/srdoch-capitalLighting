import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface iSiteLocation {
  id: number,
  typeId: string,
  location: string,
  auditId: string
}

interface iPage {
  siteLocation: iSiteLocation;
  pageId: string;
  controlOrder: string[];
  savedControls: Record<string, string>;
  savedControlValues: Record<string, string>;
}

interface iProgress {
  auditId: string;
  pageId: string;
  siteLocation?: iSiteLocation;
  controlOrder: string[];
  savedControls: Record<string, string>;
  savedControlValues: Record<string, string>;
}

const initialState: iProgress = { auditId: '', pageId: '', controlOrder: [], savedControls: {}, savedControlValues: {} };

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
    },
    setSiteLocation: (state, action: PayloadAction<iSiteLocation>) => {
      state.siteLocation = action.payload;
    }
  }
})

export const { setAuditId, setPageItems, setSiteLocation } = progressSlice.actions;

export default progressSlice.reducer;

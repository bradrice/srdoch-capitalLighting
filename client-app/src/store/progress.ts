import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';

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
  progressId: string;
  initialRow: string;
  isSaved?: boolean;
  pageId: string;
  siteLocation?: iSiteLocation;
  controlOrder: string[];
  savedControls: Record<string, string>;
  savedControlValues: Record<string, string>;
}

interface iPageItems {
  progressId?: string;
  isSaved?: boolean;
  pageId: string;
  siteLocation?: iSiteLocation;
  controlOrder: string[];
  savedControls: Record<string, string>;
  savedControlValues: Record<string, string>;
}

const initialState: iProgress = { auditId: '', pageId: '', controlOrder: [], savedControls: {}, savedControlValues: {}, isSaved: false, progressId: '', initialRow: '' };

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setAuditId: (state, action: PayloadAction<string>) => {
      state.auditId = action.payload;
      return state;
    },
    setProgressId: (state, action: PayloadAction<string>) => {
      state.progressId = action.payload;
      return state;
    },
    setPageId: (state, action: PayloadAction<string>) => {
      state.pageId = action.payload;
    },
    setPageItems: (state, action: PayloadAction<iPageItems>) => {
      console.log(action.payload);
      state = { ...state, ...action.payload }
      return state;
    },
    setSiteLocation: (state, action: PayloadAction<iSiteLocation>) => {
      state.siteLocation = action.payload;
    },
    initializeProgress: (state) => {
      console.log('initializeProgress');
      return initialState;
    },
    setIsSaved: (state, action: PayloadAction<boolean>) => {
      state.isSaved = action.payload;
    },
    setInitialRow: (state, action: PayloadAction<string>) => {
      state.initialRow = action.payload;
    }
  }
})

export const {
  setAuditId,
  setPageItems,
  setSiteLocation,
  initializeProgress,
  setIsSaved,
  setProgressId,
  setPageId,
  setInitialRow
} = progressSlice.actions;

export default progressSlice.reducer;

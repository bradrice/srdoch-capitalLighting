import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iRow } from '../types';

interface updateArgs {
  id: string;
  currLevel: number;
}

const initialState: iRow[] = [];

export const rowControlSlice = createSlice({
  name: 'rowcontrol',
  initialState,
  reducers: {
    addControl: (state, action: PayloadAction<iRow>) => {
      console.log(action.payload);
      state = state.slice(0, action.payload.rowIndex + 1);
      state[action.payload.rowIndex + 1] = action.payload;
      return state;
    },
    addNewControl: (state, action: PayloadAction<iRow>) => {
      console.log(action.payload);
      return state;
    },
    updateControl: (state, action: PayloadAction<updateArgs>) => {
      console.log(action.payload);
      const newState = [...state];
      const returnState = newState.map((row, index) => {
        if (index === action.payload.currLevel) {
          const updateItems = row.control.map(control => {
            if (control.id === action.payload.id) {
              control.selected = true;
              return control;
            } else {
              return control;
            }
          });
          console.log(updateItems);
          row.control = updateItems;
          return row;
        } else {
          return row;
        }
      });
      return returnState;
    }
  }
});

export const { addControl, addNewControl, updateControl } = rowControlSlice.actions;

export default rowControlSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iRow } from '../types';

interface updateArgs {
  id: string;
  currLevel: number;
  value: string;
}

interface updateTextArgs {
  id: string;
  currLevel: number;
  value: string;
}

const initialState: iRow[] = [];

export const rowControlSlice = createSlice({
  name: 'rowcontrol',
  initialState,
  reducers: {
    addControl: (state, action: PayloadAction<iRow>) => {
      console.log('Adding row', action.payload);
      if (action.payload !== null) {
        if (state.length === 0) {
          state[0] = action.payload;
        } else {
          state = state.slice(0, action.payload.rowIndex + 1);
          state[action.payload.rowIndex + 1] = action.payload;
        }
      }
      return state;
    },
    addNewControl: (state, action: PayloadAction<iRow>) => {
      console.log(action.payload);
      return state;
    },
    updateControl: (state, action: PayloadAction<updateArgs>) => {
      // const newState = state.slice();
      return [...state].forEach((row, index) => {
        if (index === action.payload.currLevel) {
          console.log('found correct row', index, action.payload.currLevel, action.payload.id);
          return row.control.map(control => {
            if (control.inputType === 'text' && control.id === action.payload.id) {
              control.value = action.payload.value;
              return { ...control }
            }
            if (control.inputType === 'radio' && control.id === action.payload.id) {
              console.log('set to true');
              control.selected = true;
              return { ...control };
            } else {
              control.selected = false;
              return control;
            }
          });
        } else {
          return state;
        }
      });
    },
    updateFromSavedControl: (state, action: PayloadAction<updateArgs>) => {
      // console.log(current(state[action.payload.currLevel]));
      console.log('update from saved', action.payload);
      state.map((controlrow) => {
        const newControlRow = controlrow.control.map((control, i) => {
          console.log(control.id, action.payload.id);
          if (control.inputType === 'text' && control.id === action.payload.id) {
            console.log('found a text match', action.payload.value);
            control.value = action.payload.value;
            return control
          }
          if (control.inputType === 'radio' && control.id === action.payload.id) {
            console.log('set control to true');
            control.selected = true;
            return { ...control };
          } else {
            return control;
          }
        });
        return newControlRow;
      })
    },
    addProgressControls: (state, action: PayloadAction<iRow[]>) => {
      state = action.payload;
    },
    updateTextControl: (state, action: PayloadAction<updateTextArgs>) => {
      console.log(action.payload);
      return [...state].forEach((row, index) => {
        if (index === action.payload.currLevel) {
          console.log('found correct row', index, action.payload.currLevel, action.payload.id);
          return row.control.map(control => {
            console.log('chekcing', control.id, action.payload.id)
            if (control.id === action.payload.id) {
              control.value = action.payload.value;
              return { ...control };
            } else {
              control.selected = false;
              return control;
            }
          });
        } else {
          return state;
        }
      });
    },
    initializeRows: (state) => {
      console.log('initializeRows');
      return initialState;
    }
  }
})

export const { addControl, addNewControl, updateControl, updateFromSavedControl, addProgressControls, updateTextControl, initializeRows } = rowControlSlice.actions;

export default rowControlSlice.reducer;

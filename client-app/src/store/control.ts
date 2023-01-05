import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { SubControl } from '../types';

interface UpdateArgs {
  id: string;
  parentId: string;
}

interface AddNewArgs {
  level: number;
  control: SubControl;
}

const initialState: SubControl[] = [];

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    addControl: (state, action: PayloadAction<SubControl>) => {
      const control = state.find(item => item.id === action.payload.id);
      if (control != null) {
        const remainingItems = state.filter(item => item.id !== action.payload.id);
        state = [...remainingItems, action.payload];
        return state;
      } else {
        state = [...state, action.payload]
      }
      return state;
    },
    addNewControl: (state, action: PayloadAction<AddNewArgs>) => {
      console.log(action.payload);
      const itemIndex = action.payload.level + 1;
      if (state[action.payload.level + 1] != null) {
        console.log('replace item', current(state[action.payload.level + 1]), action.payload.control);
        state = state.map((item, index) => { return index !== itemIndex ? item : action.payload.control });
      } else {
        state = [...state, action.payload.control];
      }
      state = state.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);
      return state;
    },
    updateControl: (state, action: PayloadAction<UpdateArgs>) => {
      console.log(action.payload);
      const currItem = state.find(item => item.id === action.payload.parentId);
      console.dir(current(currItem));
      if (currItem != null) {
        currItem.control.map((control) => {
          console.log(control.id === action.payload.id)
          control.selected = control.id === action.payload.id;
          return control;
        });
        state = [currItem];
      }
    }
  }
})

export const { addControl, addNewControl, updateControl } = controlSlice.actions;

export default controlSlice.reducer;

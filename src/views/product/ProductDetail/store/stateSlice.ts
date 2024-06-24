import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  sortedColumn: any;
}

const initialState: State = {
  sortedColumn: () => {},
};

const stateSlice = createSlice({
  name: 'productDetail/state',
  initialState,
  reducers: {
    setSortedColumn: (state, action: PayloadAction<any>) => {
      state.sortedColumn = action.payload;
    },
  },
});

export const { setSortedColumn } = stateSlice.actions;

export default stateSlice.reducer;

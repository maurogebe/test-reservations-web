import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  path_from_root: string[];
}

export const initialState: CommonState = {
  path_from_root: [],
};

export const commonSlice = createSlice({
  name: 'base/common',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string[]>) => {
      state.path_from_root = action.payload;
    },
  },
});

export const { setPath } = commonSlice.actions;

export default commonSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface DataState {
  loading: boolean;
}

const initialState: DataState = {
  loading: false
};

const dataSlice = createSlice({
  name: 'signin/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  },
});

export default dataSlice.reducer;

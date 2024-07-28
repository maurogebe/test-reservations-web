import { createSlice } from '@reduxjs/toolkit';

export interface DataState {
  loading: boolean;
}

const initialState: DataState = {
  loading: false
};

const dataSlice = createSlice({
  name: 'dashboard/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(getProductById.fulfilled, (state, action: PayloadAction<GetProductByIdResponse>) => {
      //   state.product = action.payload.item;
      //   state.loading = false;
      // })
      // .addCase(getProductById.pending, (state) => {
      //   state.loading = true;
      // });
  },
});

export default dataSlice.reducer;

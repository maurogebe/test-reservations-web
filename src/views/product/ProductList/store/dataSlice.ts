import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGetProducts } from '../../../../services/ProductService';
import { GetProductsParams, GetProductsResponse, Product } from '../../../../interfaces/product.interface';
import { AxiosResponse } from 'axios';

export interface DataState {
  loading: boolean;
  products: Product[];
}

export const getProducts: any = createAsyncThunk<GetProductsResponse, GetProductsParams>(
  'productList/data/getProducts',
  async (params: GetProductsParams) => {
    const response: AxiosResponse<GetProductsResponse> = await apiGetProducts(params);
    return response.data;
  }
);

const initialState: DataState = {
  loading: false,
  products: []
};

const dataSlice = createSlice({
  name: 'productList/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<GetProductsResponse>) => {
        state.products = action.payload.items;
        state.loading = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      });
  },
});

export default dataSlice.reducer;

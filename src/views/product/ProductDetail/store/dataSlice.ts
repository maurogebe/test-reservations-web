import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGetProductById } from '../../../../services/ProductService';
import { GetProductByIdResponse, Product } from '../../../../interfaces/product.interface';
import { AxiosResponse } from 'axios';
import { setPath } from '../../../../store/base/commonSlice';

export interface DataState {
  loading: boolean;
  product: Product;
}

export const getProductById: any = createAsyncThunk<GetProductByIdResponse, string>(
  'productDetail/data/getProductById',
  async (id: string, { dispatch }) => {
    try {
      const response: AxiosResponse<GetProductByIdResponse> = await apiGetProductById(id);
      dispatch(setPath(response.data.item.path_from_root || []))
      return response.data;
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
);

const initialState: DataState = {
  loading: false,
  product:  {
    id: '',
    title: '',
    description: '',
    condition: '',
    price: {
      currency: '',
      amount: 0,
      decimals: 0
    },
    picture: '',
    free_shipping: false,
    sold_quantity: 0,
    path_from_root: []
  }
};

const dataSlice = createSlice({
  name: 'productDetail/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<GetProductByIdResponse>) => {
        state.product = action.payload.item;
        state.loading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      });
  },
});

export default dataSlice.reducer;

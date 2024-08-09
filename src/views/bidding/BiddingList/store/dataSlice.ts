import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Bidding } from '../../../../interfaces/bidding.interface';
import { apiCreateBidding, apiGetBiddings, apiUpdateBidding } from '../../../../services/BiddingService';
import { toast } from '../../../../App';
import { TableData } from '../../../../interfaces/common.interface';

export interface DataState {
  loading: boolean;
  biddings: Bidding[],
  tableData: TableData
}

const initialState: DataState = {
  loading: false,
  biddings: [],
  tableData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
      order: '',
      key: ''
    }
  }
};

export const getBiddings: any = createAsyncThunk('biddingList/data/getBiddings', async (data: any) => {
  try {
      const response = await apiGetBiddings(data);
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo las subastas.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const createBidding: any = createAsyncThunk('biddingList/data/createBidding', async (data: Bidding, { rejectWithValue }) => {
  try {
      const response = await apiCreateBidding(data);
      toast({
        title: 'Subasta creado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error creando la subasta.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateBidding: any = createAsyncThunk('biddingList/data/updateBidding', async (data: Bidding, { rejectWithValue }) => {
  try {
      const response = await apiUpdateBidding(data);
      toast({
        title: 'Subasta actualizada.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error actualizando la subasta.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const dataSlice = createSlice({
  name: 'biddingList/data',
  initialState,
  reducers: {
    emptyBiddings: (state) => {
      state.biddings = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBiddings.fulfilled, (state, action: PayloadAction<Bidding[]>) => {
        state.biddings = action.payload;
        state.loading = false;
      })
      .addCase(getBiddings.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBidding.fulfilled, (state, action: PayloadAction<Bidding>) => {
        const currentState = current(state);
        state.biddings = [...currentState.biddings, action.payload];
        state.loading = false;
      })
      .addCase(createBidding.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBidding.fulfilled, (state, action: PayloadAction<Bidding>) => {
        const currentState = current(state);
        state.biddings = currentState.biddings.map((med: Bidding) =>
          med.id === action.payload.id ? action.payload : med
        );
        state.loading = false;
      })
      .addCase(updateBidding.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  emptyBiddings
} = dataSlice.actions

export default dataSlice.reducer;

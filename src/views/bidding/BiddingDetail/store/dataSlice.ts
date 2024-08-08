import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Bidding } from '../../../../interfaces/bidding.interface';
import { apiCreateBidding, apiGetBidding, apiGetBiddings, apiUpdateBidding } from '../../../../services/BiddingService';
import { toast } from '../../../../App';
import { TableData } from '../../../../interfaces/common.interface';
import { Bid } from '../../../../interfaces/bid.interface';
import { apiCreateBid, apiGetBid, apiUpdateBid } from '../../../../services/BidService';
import { Player, ResponseGetPlayers } from '../../../../interfaces/player.interface';
import { apiGetPlayers } from '../../../../services/PlayerService';

export interface DataState {
  loading: boolean;
  loadingBid: boolean;
  bidding: Bidding,
  players: Player[],
  tableData: TableData,
  bid: Bid,
  bidActive: Bid,
  amount: number
}

export const initialState: DataState = {
  loading: false,
  loadingBid: false,
  bidding: {
    name: '',
    open: false
  },
  players: [],
  bid: {},
  bidActive: {},
  amount: 0,
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

export const getPlayers: any = createAsyncThunk('biddingDetail/data/getPlayers', async (data: any) => {
  try {
      const response = await apiGetPlayers(data);
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo los jugadores.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const getBiddingById: any = createAsyncThunk('biddingDetail/data/getBiddingById', async (data: any) => {
  try {
      const response = await apiGetBidding(data);
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

export const getBid: any = createAsyncThunk('biddingDetail/data/getBid', async (idPlayer: number) => {
    try {
        const response = await apiGetBid(idPlayer);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const createBid: any = createAsyncThunk('biddingDetail/data/createBid', async (data: any, { rejectWithValue }) => {
  try {
      await apiCreateBid(data.data);
      toast({
        title: 'Subasta creada.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      const response = await apiGetPlayers(data.filters);
      return response.data;
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

export const updateBid: any = createAsyncThunk('biddingDetail/data/updateBid', async (data: any, { rejectWithValue }) => {
  try {
      await apiUpdateBid(data.data);
      toast({
        title: 'Subasta actualizada.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      const response = await apiGetPlayers(data.filters);
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
  name: 'biddingDetail/data',
  initialState,
  reducers: {
    setPageIndex: (state, action) => {
      state.tableData.pageIndex = action.payload
    },
    setPageSize: (state, action) => {
      state.tableData.pageSize = action.payload
    },
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setSort: (state, action: PayloadAction<{ key: string, order: 'asc' | 'desc' }>) => {
      state.tableData.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBid.fulfilled, (state, action: PayloadAction<{ bid: Bid, bidActive: Bid }>) => {
        state.bid = action.payload.bid;
        state.bidActive = action.payload.bidActive;
      })
      .addCase(getBid.pending, (state) => {
        // state.loading = true;
      })
      .addCase(createBid.fulfilled, (state, action: PayloadAction<ResponseGetPlayers>) => {
        state.players = action.payload.players;
        state.amount = action.payload.amount;
        state.tableData.total = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(createBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBid.fulfilled, (state, action: PayloadAction<ResponseGetPlayers>) => {
        state.players = action.payload.players;
        state.amount = action.payload.amount;
        state.tableData.total = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(updateBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlayers.fulfilled, (state, action: PayloadAction<ResponseGetPlayers>) => {
        state.players = action.payload.players;
        state.amount = action.payload.amount;
        state.tableData.total = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(getPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBiddingById.fulfilled, (state, action: PayloadAction<Bidding>) => {
        state.bidding = action.payload;
        state.loading = false;
      })
      .addCase(getBiddingById.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  setPageIndex,
  setPageSize,
  setTableData,
  setSort
} = dataSlice.actions

export default dataSlice.reducer;

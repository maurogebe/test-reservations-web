import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '../../../App';
import { TableData } from '../../../interfaces/common.interface';
import { Team } from '../../../interfaces/team.interface';
import { apiCreateTeam, apiGetTeam, apiUpdateTeam } from '../../../services/TeamService';
import { addPlayers } from './stateSlice';

export interface DataState {
  loading: boolean;
  team: Team,
  budget: number,
  lineup: number[],
  tableData: TableData
}

export const initialState: DataState = {
  loading: false,
  team: {
    name: '',
    club: '',
    players: [],
    lineupPlayers: []
  },
  lineup: [3, 3, 4, 1],
  budget: 0,
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

export const getTeam: any = createAsyncThunk('team/data/getTeam', async (data: any, { dispatch }) => {
  try {
      const response = await apiGetTeam(data);
      dispatch(addPlayers(response.data.lineupPlayers));
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo el equipo.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const createTeam: any = createAsyncThunk('team/data/createTeam', async (data: any, { rejectWithValue }) => {
  try {
      const response = await apiCreateTeam(data.data);
      toast({
        title: 'Equipo creado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data;
  } catch (error: any) {
    toast({
      title: 'Error creando el equipo.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateTeam: any = createAsyncThunk('team/data/updateTeam', async (data: any, { rejectWithValue }) => {
  try {
      const response = await apiUpdateTeam(data);
      toast({
        title: 'Equipo actualizado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data;
  } catch (error: any) {
    toast({
      title: 'Error actualizando el equipo.',
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
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setSort: (state, action: PayloadAction<{ key: string, order: 'asc' | 'desc' }>) => {
      state.tableData.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.team = action.payload;
        state.lineup = action.payload.lineup?.split(',').map((e: string) => Number(e)) || [];
        state.budget = action.payload.budget || 0;
        state.loading = false;
      })
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.team = action.payload;
        // state.tableData.total = action.payload.totalItems;
        state.loading = false;
      })
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        // state.team = action.payload;
        state.loading = false;
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
      })
  },
});

export const {
  setTableData,
  setSort
} = dataSlice.actions

export default dataSlice.reducer;

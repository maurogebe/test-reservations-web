import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../../interfaces/city.interface';
import { apiGetCities } from '../../../services/CityService';
import { toast } from '../../../App';
import { Room, RoomQueries } from '../../../interfaces/room.interface';
import { apiGetRooms } from '../../../services/RoomService';
import { apiCreateReservation } from '../../../services/ReservationService';
import { Reservation } from '../../../interfaces/reservation.interface';
import { AxiosError } from 'axios';

export interface DataState {
  cities: City[];
  rooms: Room[];
  loading: boolean;
  queries: RoomQueries;
}

const initialState: DataState = {
  cities: [],
  rooms: [],
  loading: false,
  queries: {
    startDate: null,
    endDate: null,
    cityId: null,
    capacity: null,
  }
};

export const getCities: any = createAsyncThunk('dashboard/data/getCities', async () => {
  try {
      const response = await apiGetCities();
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo las ciudades.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const getRooms: any = createAsyncThunk('dashboard/data/getRooms', async (queries: RoomQueries) => {
  try {
      const response = await apiGetRooms(queries);
      return { data: response.data, queries }
  } catch (error) {
    toast({
      title: 'Error obteniendo las habitaciones.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const createReservation: any = createAsyncThunk('dashboard/data/createReservation', async (data: any) => {
  try {
    await apiCreateReservation(data);
    toast({
      title: 'Reservado exitosamente',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  } catch (error: any) {
    toast({
      title: error?.response?.data?.message || 'Error creando la reservación.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

const dataSlice = createSlice({
  name: 'dashboard/data',
  initialState,
  reducers: {
    clearRooms: (state) => {
      state.rooms = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.fulfilled, (state, action: PayloadAction<City[]>) => {
        state.cities = action.payload;
        state.loading = false;
      })
      .addCase(getCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRooms.fulfilled, (state, action: PayloadAction<{ data: Room[], queries: RoomQueries }>) => {
        state.rooms = action.payload.data;
        state.queries = action.payload.queries;
        state.loading = false;
      })
      .addCase(getRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRooms.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createReservation.fulfilled, (state) => {
        state.rooms = [];
        state.loading = false;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  clearRooms
} = dataSlice.actions

export default dataSlice.reducer;

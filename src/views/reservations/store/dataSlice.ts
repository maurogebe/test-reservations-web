import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '../../../App';
import { Reservation, ReservationQueries } from '../../../interfaces/reservation.interface';
import { apiDeleteReservation, apiGetReservations, apiUpdateReservation } from '../../../services/ReservationService';

export interface DataState {
  reservations: Reservation[];
  loading: boolean;
}

const initialState: DataState = {
  reservations: [],
  loading: false
};

export const getReservations: any = createAsyncThunk('reservation/data/getReservations', async (queries: ReservationQueries) => {
  try {
      const response = await apiGetReservations(queries);
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo las reservaciones.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const updateReservation: any = createAsyncThunk('reservation/data/updateReservation', async (data: any) => {
  try {
    await apiUpdateReservation(data.id, data.data);
    toast({
      title: 'Reservación actualizada exitosamente',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
    return data.data;
  } catch (error: any) {
    toast({
      title: error?.response?.data?.message || 'Error actualizando la reservación.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const deleteReservation: any = createAsyncThunk('reservation/data/deleteReservation', async (data: any) => {
  try {
    await apiDeleteReservation(data);
    toast({
      title: 'Reservación eliminada exitosamente',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
    return data;
  } catch (error: any) {
    toast({
      title: error?.response?.data?.message || 'Error eliminando la reservación.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

const dataSlice = createSlice({
  name: 'reservation/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.fulfilled, (state, action: PayloadAction<Reservation[]>) => {
        state.reservations = action.payload;
        state.loading = false;
      })
      .addCase(getReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReservations.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
        const currentState = current(state);
        state.reservations = currentState.reservations.map((r: Reservation) => r.id == action.payload.id ? action.payload : r);
        state.loading = false;
      })
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReservation.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteReservation.fulfilled, (state, action: PayloadAction<number>) => {
        const currentState = current(state);
        state.reservations = currentState.reservations.filter((r: Reservation) => r.id != action.payload);
        state.loading = false;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReservation.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dataSlice.reducer;

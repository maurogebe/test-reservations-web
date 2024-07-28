import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Medicament } from '../../../interfaces/medicament.interface';
import { apiCreateMedicament, apiGetMedicaments } from '../../../services/MedicamentService';
import { Toast } from '@chakra-ui/react';

export interface DataState {
  loading: boolean;
  medicaments: Medicament[]
}

const initialState: DataState = {
  loading: false,
  medicaments: []
};

export const getMedicaments: any = createAsyncThunk('medicament/data/getMedicaments', async (data: any) => {
  try {
      const response = await apiGetMedicaments(data);
      return response.data
  } catch (error) {
    Toast({
      title: 'Error obteniendo los medicamentos.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const createMedicament: any = createAsyncThunk('medicament/data/createMedicament', async (data: Medicament, { rejectWithValue }) => {
  try {
      const response = await apiCreateMedicament(data);
      Toast({
        title: 'Medicamento creado.',
        // description: "We've created your account for you.",
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    Toast({
      title: 'Error creando el medicamento.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const dataSlice = createSlice({
  name: 'medicament/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMedicaments.fulfilled, (state, action: PayloadAction<Medicament[]>) => {
        state.medicaments = action.payload;
        state.loading = false;
      })
      .addCase(getMedicaments.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMedicament.fulfilled, (state, action: PayloadAction<Medicament>) => {
        const currentState = current(state);
        state.medicaments = [...currentState.medicaments, action.payload];
        state.loading = false;
      })
      .addCase(createMedicament.pending, (state) => {
        state.loading = true;
      });
  },
});

export default dataSlice.reducer;

import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Medicament } from '../../../interfaces/medicament.interface';
import { apiCreateMedicament, apiGetMedicaments, apiUpdateMedicament } from '../../../services/MedicamentService';
import { toast } from '../../../App';

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
    toast({
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
      toast({
        title: 'Medicamento creado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error creando el medicamento.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateMedicament: any = createAsyncThunk('medicament/data/updateMedicament', async (data: Medicament, { rejectWithValue }) => {
  try {
      const response = await apiUpdateMedicament(data);
      toast({
        title: 'Medicamento actualizado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error actualizando el medicamento.',
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
  reducers: {
    emptyMedicaments: (state) => {
      state.medicaments = []
    }
  },
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
      })
      .addCase(updateMedicament.fulfilled, (state, action: PayloadAction<Medicament>) => {
        const currentState = current(state);
        state.medicaments = currentState.medicaments.map((med) =>
          med.id === action.payload.id ? action.payload : med
        );
        state.loading = false;
      })
      .addCase(updateMedicament.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  emptyMedicaments
} = dataSlice.actions

export default dataSlice.reducer;

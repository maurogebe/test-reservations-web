import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { apiCreateMedicament, apiGetMedicaments, apiUpdateMedicament } from '../../../services/MedicamentService';
import { toast } from '../../../App';
import { Allergy } from '../../../interfaces/allergy.interface';
import { apiCreateAllergy, apiGetAllergies, apiUpdateAllergy } from '../../../services/AllergyService';

export interface DataState {
  loading: boolean;
  allergies: Allergy[]
}

const initialState: DataState = {
  loading: false,
  allergies: []
};

export const getAllergies: any = createAsyncThunk('allergy/data/getAllergies', async (data: any) => {
  try {
      const response = await apiGetAllergies(data);
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo las alergias.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const createAllergy: any = createAsyncThunk('allergy/data/createAllergy', async (data: Allergy, { rejectWithValue }) => {
  try {
      const response = await apiCreateAllergy(data);
      toast({
        title: 'Alergia creado.',
        // description: "We've created your account for you.",
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error creando la alergia.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateAllergy: any = createAsyncThunk('allergy/data/updateAllergy', async (data: Allergy, { rejectWithValue }) => {
  try {
      const response = await apiUpdateAllergy(data);
      toast({
        title: 'Alergia actualizado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error actualizando la alergia.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const dataSlice = createSlice({
  name: 'allergy/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllergies.fulfilled, (state, action: PayloadAction<Allergy[]>) => {
        state.allergies = action.payload;
        state.loading = false;
      })
      .addCase(getAllergies.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAllergy.fulfilled, (state, action: PayloadAction<Allergy>) => {
        const currentState = current(state);
        state.allergies = [...currentState.allergies, action.payload];
        state.loading = false;
      })
      .addCase(createAllergy.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAllergy.fulfilled, (state, action: PayloadAction<Allergy>) => {
        const currentState = current(state);
        state.allergies = currentState.allergies.map((med) =>
          med.id === action.payload.id ? action.payload : med
        );
        state.loading = false;
      })
      .addCase(updateAllergy.pending, (state) => {
        state.loading = true;
      });
  },
});

export default dataSlice.reducer;

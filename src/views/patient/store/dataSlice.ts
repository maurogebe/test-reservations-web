import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '../../../App';
import { Patient } from '../../../interfaces/patient.interface';
import { apiCreatePatient, apiGetPatients, apiUpdatePatient } from '../../../services/PatientService';

export interface DataState {
  loading: boolean;
  patients: Patient[]
}

const initialState: DataState = {
  loading: false,
  patients: []
};

export const getPatients: any = createAsyncThunk('patient/data/getPatients', async (data: any) => {
  try {
      const response = await apiGetPatients(data);
      return response.data
  } catch (error) {
    toast({
      title: 'Error obteniendo los pacientes.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }
});

export const createPatient: any = createAsyncThunk('patient/data/createPatient', async (data: Patient, { rejectWithValue }) => {
  try {
      const response = await apiCreatePatient(data);
      toast({
        title: 'Paciente creado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error creando el paciente.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updatePatient: any = createAsyncThunk('patient/data/updatePatient', async (data: Patient, { rejectWithValue }) => {
  try {
      const response = await apiUpdatePatient(data);
      toast({
        title: 'Paciente actualizado.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error actualizando el paciente.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const dataSlice = createSlice({
  name: 'patient/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.patients = action.payload;
        state.loading = false;
      })
      .addCase(getPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        const currentState = current(state);
        state.patients = [...currentState.patients, action.payload];
        state.loading = false;
      })
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        const currentState = current(state);
        state.patients = currentState.patients.map((med) =>
          med.id === action.payload.id ? action.payload : med
        );
        state.loading = false;
      })
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
      });
  },
});

export default dataSlice.reducer;

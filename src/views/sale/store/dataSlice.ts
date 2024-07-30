import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '../../../App';
import { Patient } from '../../../interfaces/patient.interface';
import { apiCreatePatient, apiGetPatients, apiUpdatePatient } from '../../../services/PatientService';
import { Sale } from '../../../interfaces/sale.interface';
import { apiCreateSale } from '../../../services/SaleService';
import { addInitialState } from './stateSlice';

export interface DataState {
  loading: boolean;
}

const initialState: DataState = {
  loading: false
};

export const createSale: any = createAsyncThunk('sale/data/createSale', async (data: Sale, { rejectWithValue, dispatch }) => {
  try {
      const response = await apiCreateSale(data);
      dispatch(addInitialState())
      toast({
        title: 'Venta realizada.',
        status: 'success',
        duration: 4000,
        isClosable: true
      })
      return response.data
  } catch (error: any) {
    toast({
      title: 'Error creando la venta.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const dataSlice = createSlice({
  name: 'sale/data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSale.fulfilled, (state, action: PayloadAction<Sale>) => {
        state.loading = false;
      })
      .addCase(createSale.pending, (state) => {
        state.loading = true;
      })
  },
});

export default dataSlice.reducer;

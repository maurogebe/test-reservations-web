import { createSlice } from '@reduxjs/toolkit'
import { Patient } from '../../../interfaces/patient.interface';

export interface State {
    patientSelected: Patient
}

export const initialState: State = {
    patientSelected: {
        id: 0,
        name: '',
        email: '',
        healthInsuranceNumber: '',
        birthDate: undefined,
        allergies: [],
    }
};

const stateSlice = createSlice({
    name: 'patient/state',
    initialState,
    reducers: {
        setPatientSelected: (state, action) => {
            state.patientSelected = action.payload
        }
    },
})

export const {
    setPatientSelected
} = stateSlice.actions

export default stateSlice.reducer

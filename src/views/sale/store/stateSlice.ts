import { createSlice, current } from '@reduxjs/toolkit'
import { MedicamentSold } from '../../../interfaces/medicament-sold.interface';
import { Patient } from '../../../interfaces/patient.interface';

export interface State {
    selectedMedicaments: MedicamentSold[],
    selectedPatient: Patient,
    selectedPaymentMethod: ''
}

export const initialState: State = {
    selectedMedicaments: [],
    selectedPatient: {
        name: '',
        email: '',
        healthInsuranceNumber: ''
    },
    selectedPaymentMethod: ''
};

const stateSlice = createSlice({
    name: 'sale/state',
    initialState,
    reducers: {
        setSelectedPaymentMethod: (state, action) => {
            state.selectedPaymentMethod = action.payload
        },
        setSelectedMedicaments: (state, action) => {
            state.selectedMedicaments = action.payload
        },
        setQuantitySelectedMedicaments: (state, action) => {
            const { id, quantity } = action.payload
            const currentState = current(state)
            state.selectedMedicaments = currentState.selectedMedicaments.map((med: MedicamentSold) => {
                if(id == med?.medicament?.id) return { ...med, quantity }
                return med;
            })
        },
        setSelectedPatient: (state, action) => {
            state.selectedPatient = action.payload
        },
        addInitialState: (state) => {
            state.selectedMedicaments = initialState.selectedMedicaments
            state.selectedPatient = initialState.selectedPatient
            state.selectedPaymentMethod = initialState.selectedPaymentMethod
        },
    },
})

export const {
    setSelectedPaymentMethod,
    setSelectedMedicaments,
    setQuantitySelectedMedicaments,
    setSelectedPatient,
    addInitialState
} = stateSlice.actions

export default stateSlice.reducer

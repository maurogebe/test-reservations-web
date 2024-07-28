import { createSlice } from '@reduxjs/toolkit'
import { Medicament } from '../../../interfaces/medicament.interface';

export interface State {
    medicamentSelected: Medicament
}

const initialState: State = {
    medicamentSelected: {
        id: 0,
        name: '',
        form: '',
        stock: 0,
        cost: 0,
        description: '',
    }
};

const stateSlice = createSlice({
    name: 'medicament/state',
    initialState,
    reducers: {
        setMedicamentSelected: (state, action) => {
            state.medicamentSelected = action.payload
        }
    },
})

export const {
    setMedicamentSelected
} = stateSlice.actions

export default stateSlice.reducer

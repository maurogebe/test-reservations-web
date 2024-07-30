import { createSlice } from '@reduxjs/toolkit'
import { Allergy } from '../../../interfaces/allergy.interface';

export interface State {
    allergySelected: Allergy
}

export const initialState: State = {
    allergySelected: {
        id: 0,
        name: '',
        description: ''
    }
};

const stateSlice = createSlice({
    name: 'allergy/state',
    initialState,
    reducers: {
        setAllergySelected: (state, action) => {
            state.allergySelected = action.payload
        }
    },
})

export const {
    setAllergySelected
} = stateSlice.actions

export default stateSlice.reducer

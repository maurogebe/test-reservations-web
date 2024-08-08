import { createSlice } from '@reduxjs/toolkit'
import { Bid } from '../../../../interfaces/bid.interface';

export interface State {
    bidSelected: Bid | null
}

export const initialState: State = {
    bidSelected: null
};

const stateSlice = createSlice({
    name: 'biddintDetail/state',
    initialState,
    reducers: {
        setBidSelected: (state, action) => {
            state.bidSelected = action.payload
        }
    },
})

export const {
    setBidSelected
} = stateSlice.actions

export default stateSlice.reducer

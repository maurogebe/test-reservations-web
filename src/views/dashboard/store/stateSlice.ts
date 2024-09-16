import { createSlice } from '@reduxjs/toolkit'
import { Room } from '../../../interfaces/room.interface';

export interface State {
    roomSelected: Room | null
}

export const initialState: State = {
    roomSelected: null
};

const stateSlice = createSlice({
    name: 'dashboard/state',
    initialState,
    reducers: {
        setRoomSelected: (state, action) => {
            state.roomSelected = action.payload
        }
    },
})

export const {
    setRoomSelected
} = stateSlice.actions

export default stateSlice.reducer

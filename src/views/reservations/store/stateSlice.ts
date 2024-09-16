import { createSlice } from '@reduxjs/toolkit'
import { Room } from '../../../interfaces/room.interface';
import { Reservation } from '../../../interfaces/reservation.interface';

export interface State {
    reservationSelected: Reservation | null
}

export const initialState: State = {
    reservationSelected: null
};

const stateSlice = createSlice({
    name: 'reservation/state',
    initialState,
    reducers: {
        setReservationSelected: (state, action) => {
            state.reservationSelected = action.payload
        }
    },
})

export const {
    setReservationSelected
} = stateSlice.actions

export default stateSlice.reducer

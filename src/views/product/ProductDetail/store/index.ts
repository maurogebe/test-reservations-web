import { combineReducers, Reducer } from '@reduxjs/toolkit'
import state, { State } from './stateSlice'
import data, { DataState } from './dataSlice'

const reducer: Reducer<{ data: DataState, state: State }> = combineReducers({
    state,
    data
})

export default reducer
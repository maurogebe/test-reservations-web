import { combineReducers, Reducer } from '@reduxjs/toolkit'
import data, { DataState } from './dataSlice'
import state, { State } from './stateSlice'

const reducer: Reducer<{ data: DataState, state: State }> = combineReducers({
    data,
    state
})

export default reducer
import { combineReducers, Reducer } from '@reduxjs/toolkit'
import state, { State } from './stateSlice'
import data, { DataState } from './dataSlice'

const reducer: Reducer<{ state: State, data: DataState }> = combineReducers({
    state,
    data
})

export default reducer
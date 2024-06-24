import { combineReducers, Reducer } from '@reduxjs/toolkit'
import data, { DataState } from './dataSlice'

const reducer: Reducer<{ data: DataState }> = combineReducers({
    data
})

export default reducer
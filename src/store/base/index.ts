import { combineReducers, Reducer } from '@reduxjs/toolkit'
import common, { CommonState } from './commonSlice'

const reducer: Reducer<{ common: CommonState }> = combineReducers({
    common
})

export default reducer
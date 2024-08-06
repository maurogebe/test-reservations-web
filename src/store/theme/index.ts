import { combineReducers, Reducer } from '@reduxjs/toolkit'
import state, { CommonState } from '../theme/themeSlice'

const reducer: Reducer<{ state: CommonState }> = combineReducers({
    state
})

export default reducer
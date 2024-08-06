import { createSlice } from '@reduxjs/toolkit'
import { themeConfig } from '../../constants/theme.constant'

export interface CommonState {
  themeColor: string;
	primaryColorLevel: string | number
}

const initialState: CommonState = {
	themeColor: themeConfig.themeColor,
	primaryColorLevel: themeConfig.primaryColorLevel
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setThemeColor: (state, action) => {
			state.themeColor = action.payload
		},
		setThemeColorLevel: (state, action) => {
			state.primaryColorLevel = action.payload
		},
	},
})

export const {
	setThemeColor,
	setThemeColorLevel
} = themeSlice.actions

export default themeSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
    token: string,
    signedIn: boolean
}

export const initialState: AuthState = {
  token: '',
  signedIn: false
};

export const sessionSlice = createSlice({
	name: 'auth/session',
	initialState,
	reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
        },
        setToken: (state, action) =>  {
            state.token = action.payload
        }
	},
})

export const { onSignInSuccess, onSignOutSuccess, setToken } = sessionSlice.actions

export default sessionSlice.reducer
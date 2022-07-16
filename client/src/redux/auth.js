import {createSlice} from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
   name: 'auth',
   initialState: {
      authData: null,
      token: localStorage.getItem("token") ? localStorage.getItem("token") : null
   },
   reducers: {
      handleAuth: (state, action) => {
         console.log(state,action)
         localStorage.setItem("profile", JSON.stringify(action.payload))
         localStorage.setItem("token", action.payload.access_token)
         state.authData = action.payload
      },
      handleLogout: (state, action) => {
         localStorage.clear()
         state.authData = null
      },
   }
})

export const {
   handleAuth,
   handleLogout
} = layoutSlice.actions

export default layoutSlice.reducer
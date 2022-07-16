import {createSlice} from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
   name: 'auth',
   initialState: {
      authData: localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null
   },
   reducers: {
      handleAuth: (state, action) => {
         localStorage.setItem("profile", JSON.stringify(action.payload))
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
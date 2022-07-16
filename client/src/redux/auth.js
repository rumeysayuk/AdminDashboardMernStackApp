import {createSlice} from '@reduxjs/toolkit'

export const layoutSlice = createSlice({
   name: 'auth',
   initialState: {
      authData: localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null
   },
   reducers: {
      setAuthData: (state, action) => {
         localStorage.setItem("profile", JSON.stringify(action.payload))
         state.authData = action.payload
      }
   }
})

export const {
   setAuthData,
} = layoutSlice.actions

export default layoutSlice.reducer
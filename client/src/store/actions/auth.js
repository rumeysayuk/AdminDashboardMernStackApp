import {AUTH} from "../constants/actionTypes"
import * as api from "../../api/index"

export const login = (formData, navigate) => async (dispatch) => {
   try {
      const {data} = await api.login(formData)
      dispatch({type: AUTH, data})
      navigate("/")
   } catch (e) {
      console.log(e.message)
   }
}

export const register = (formData, navigate) => async (dispatch) => {
   try {
      const {data} = await api.register(formData)
      dispatch({type: AUTH, data})
      navigate("/")
   } catch (e) {
      console.log(e.message)
   }
}

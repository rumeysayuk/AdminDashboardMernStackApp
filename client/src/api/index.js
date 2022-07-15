import axios from "axios"
// import * as queryString from "querystring";

const API = axios.create({baseURL: process.env.REACT_APP_BASE_API_URI})
API.interceptors.request.use((req) => {
   if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
   }
   return req
})

export const login = (formData) => API.post(`/auth/login`, formData)

export const register = (formData) => API.post(`/auth/register`, formData)

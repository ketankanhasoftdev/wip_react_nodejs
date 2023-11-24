import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtAxios from "../../services/api";
import { AuthInputs } from "../../interface/interface";
import { userReducer } from "../slices/authSlice";

export const loginThunk = createAsyncThunk('user/login', async (requestPayload: AuthInputs, { dispatch }) => {
  try {
      const {data}=await jwtAxios.post('/login',{...requestPayload})
      localStorage.setItem('userData',JSON.stringify({
        ...data.data,isLoggedIn:true,
      }))
      dispatch(userReducer({
        ...data.data,isLoggedIn:true,
      }))
  } catch (error) {
    
  }
});

export const registrationThunk=createAsyncThunk('user/register',async(requestPayload:AuthInputs,{dispatch})=>{
  try {
    const {data}=await jwtAxios.post('/user',{...requestPayload})
  } catch (error) {
    
  }
})
import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtAxios from "../../services/api";
import { AuthInputs } from "../../interface/interface";
import { userReducer } from "../slices/authSlice";
import { notificationFail, notificationSuccess } from "../slices/toastSlice";

export const loginThunk = createAsyncThunk('user/login', async (requestPayload: AuthInputs, { dispatch }) => {
  try {
  
      const {data}=await jwtAxios.post('/login',{...requestPayload})
      localStorage.setItem('userData',JSON.stringify({
        ...data.data,isLoggedIn:true,
      }))
      dispatch(userReducer({
        ...data.data,isLoggedIn:true,
      }))
      dispatch(notificationSuccess('Logged In successfully'))
  } catch (error) {
    dispatch(notificationFail('Wrong email or password'))
  }
});

export const registrationThunk=createAsyncThunk('user/register',async(requestPayload:AuthInputs,{dispatch})=>{
  try {
    const {data}=await jwtAxios.post('/user',{...requestPayload})
    dispatch(notificationSuccess('User registered successfully'))
    setTimeout(()=>{
      dispatch(notificationSuccess('Please Login to continue'))
    },1000)
  } catch (error) {
    dispatch(notificationFail('Something Went Wrong'))
  }
})
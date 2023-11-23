import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtAxios from "../../services/api";
import { AuthInputs } from "../../interface/interface";

export const loginThunk = createAsyncThunk('user/login', async (requestPayload: AuthInputs, { dispatch }) => {
  try {
      const res=await jwtAxios.post('/login',{...requestPayload})
  } catch (error) {
    
  }
});

export const registrationThunk=createAsyncThunk('user/register',async(requestPayload:AuthInputs,{dispatch})=>{
  try {
    const res=await jwtAxios.post('/user',{...requestPayload})
  } catch (error) {
    
  }
})
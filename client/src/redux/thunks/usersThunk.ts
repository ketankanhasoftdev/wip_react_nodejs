import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtAxios from "../../services/api";
import { UserType } from "../../interface/interface";
import { notificationFail, notificationSuccess } from "../slices/toastSlice";
import { userReducer } from "../slices/authSlice";
import { updateUsersList } from "../slices/userSlice";

export const getAllUsers=createAsyncThunk('get/users',async(requestPayload,{dispatch})=>{
try {
  const {data} =await jwtAxios.get('/users')
  dispatch(updateUsersList(data))
} catch (error) {
    dispatch(notificationFail(`Couldn't fetch users please try again`))
}
})

export const updateUserThunk=createAsyncThunk('update/user',async(updatuserRequest:UserType,{dispatch})=>{
    try {
       const {data}=await jwtAxios.patch(`/user/${updatuserRequest.id}`,{...updatuserRequest})
        dispatch(userReducer({...data,isLoggedIn:true}))
        dispatch(notificationSuccess('Details updated successfully'))
    } catch (error) {
        dispatch(notificationFail("Something went wrong !"))
    }
})

export const deleteUserThunk=createAsyncThunk('delete/user',async(requestPayload:any,{dispatch})=>{
const {id,...rest}=requestPayload
    try {
    const {data}=await jwtAxios.delete(`/user/${id}`)
    dispatch(notificationSuccess('User deleted successfully'))
    if(id===rest._id){
        localStorage.removeItem('userData')
         dispatch(userReducer({}));
    }
    dispatch(getAllUsers())
} catch (error) {
    dispatch(notificationFail(`something went wrong please try again`))
}
})

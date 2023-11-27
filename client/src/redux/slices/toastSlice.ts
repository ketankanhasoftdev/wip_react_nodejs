import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const toastSlice=createSlice({
name:'toastSlice',
initialState:{
    toastState:{
        type:"",
        message:""
    }
},
reducers:{
    notificationSuccess:(state,action:PayloadAction<string>)=>{
        state.toastState={
            type:'success',
            message:action.payload
        }
    },
     notificationFail:(state,action:PayloadAction<string>)=>{
        state.toastState={
            type:'error',
            message:action.payload
        }
    },
}
})

export const {notificationSuccess,notificationFail}=toastSlice.actions
export default toastSlice.reducer
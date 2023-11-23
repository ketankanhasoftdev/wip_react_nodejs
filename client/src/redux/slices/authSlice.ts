import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const intitialState={
    userDetails:{}
} as any

export const authSlice=createSlice({
    name:'authSlice',
    intitialState,
    reducers:{
        userLogin:(state:any,action:<PayloadAction>)=>{
            state.userDetails=action.payload
        }
    }
})
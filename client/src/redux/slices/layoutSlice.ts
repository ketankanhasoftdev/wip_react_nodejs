import { createSlice,type PayloadAction } from "@reduxjs/toolkit"


const initialState={
    screenSize:{
        width:1200,
        height:750
    }
}
const layoutSlice=createSlice({
    name:"layoutSliec",
    initialState,
    reducers:{
        updateScreenSize:(state,action:PayloadAction<any>)=>{
            state.screenSize=action.payload
        }
    }
})
export const {updateScreenSize}=layoutSlice.actions
export default layoutSlice.reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState={
    usersList:[]
}

const userSlice=createSlice({
    name:'usersSlice',
    initialState,
    reducers:{
        updateUsersList:(state,action:PayloadAction<any>)=>{
            state.usersList=action.payload
        }
    }
})

export const {updateUsersList}=userSlice.actions
export default userSlice.reducer
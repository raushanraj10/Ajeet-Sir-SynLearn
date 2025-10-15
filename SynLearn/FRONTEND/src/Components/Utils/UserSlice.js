import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:"userdata",
    initialState:null,
    reducers:{
       adduser:(state,action)=>{
        return action.payload
       },
       removeuser:()=>null,
    }
})

export const {adduser,removeuser}=UserSlice.actions
export default UserSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    authStatus:false,
    authData:null
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginReducer:(state,action)=>{
            
            state.authStatus=true
            state.authData=action.payload
        },
        logoutReducer:(state,action)=>{
            state.authStatus=false;
            state.authData=null
        }
    }
})


export const {loginReducer,logoutReducer}=authSlice.actions

export default authSlice.reducer

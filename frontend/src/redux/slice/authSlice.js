import { createSlice } from "@reduxjs/toolkit";

//! Initial State
const authSlice = createSlice({
    name:'auth',
    initialState:{
        user: JSON.parse(localStorage.getItem('userInfo')) || null,
    },

    //! Reducers
    reducers:{
        loginAction : (state, action) =>{
            state.user = action.payload;
        },

        logoutAction : (state, action) =>{
            state.user = null;
        },
    }
});

//!Generate Action
export const {loginAction, logoutAction} = authSlice.actions;
//!Generate Reducer

const authReducer = authSlice.reducer;  
export default authReducer;
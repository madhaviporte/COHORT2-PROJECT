import {createSlice} from "@reduxjs/toolkit"

let authSlice = createSlice({
    name: "auth",
    initialState:{
        employee: null,
        isLoding: false, 
    },
    reducers:{
        addEmployee:(state,action) =>{
            state.employee = action.payload;
            state.isLoding = false;
        },
    removeEmployee: (state) =>{
        state.employee = null;
        state.isLoding=false;
        
    },
    },
});

export let {addEmployee, removeEmployee} = authSlice.actions
export default authSlice.reducer;
import  {createSlice} from "@reduxjs/toolkit"

let authSlice = createSlice({
    name: "auth",
    initialState: {
        employee: null,
        inLoading: false,
    },
    reducers:{
        addEmployee:(state,action) =>{
            state.employee = action.payload;
            state.isLoading = false;
        },
        removeEmployee:(state) =>{
            state.employee = null;
            state.isLoading = false;
        },
    },
})

export let {addEmployee, removeEmployee} = authSlice.action
export default authSlice.reducer;
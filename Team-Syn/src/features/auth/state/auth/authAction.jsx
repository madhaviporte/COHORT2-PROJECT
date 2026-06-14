import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosinstace";

export let loginEmployee = createAsyncThunk(
    '/auth/login',
 async (credentials,thunkApi)=>{
    try{
let res = await axiosInstance.post('/auth/login', credentials)
console.log(res);

return res.data
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})
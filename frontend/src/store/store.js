import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../redux/auth/authSlice";
import { authReducer } from '../redux/auth/authSlice'

const store = configureStore({
    reducer: {
        // auth: authSlice,
        auth: authReducer
    }
})


export default store
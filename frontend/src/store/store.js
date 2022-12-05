import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../redux/auth/authSlice";
import { authReducer } from '../redux/auth/authSlice'
import { ticketReducer } from "../redux/tickets/ticketSlice";

const store = configureStore({
    reducer: {
        // auth: authSlice,
        auth: authReducer,
        ticket: ticketReducer
    }
})


export default store
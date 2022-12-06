import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "../redux/auth/authSlice";
import { authReducer } from '../redux/auth/authSlice'
import { ticketReducer } from "../redux/tickets/ticketSlice";
import { notesReducer } from "../redux/notes/noteSlice";

const store = configureStore({
    reducer: {
        // auth: authSlice,
        auth: authReducer,
        ticket: ticketReducer,
        notes: notesReducer
    }
})


export default store
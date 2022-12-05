import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const createTicket = createAsyncThunk('tickets/create', async(ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Get user tickets
export const showTickets = createAsyncThunk('tickets/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.showTicket(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Get Single ticket
export const getTicket = createAsyncThunk('tickets/getOne', async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicket(ticketId, token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Close Ticket
export const closeOneTicket = createAsyncThunk('tickets/close', async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        resetTicket: (state) => {
            state.tickets = []
            state.ticket = {}
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = false
        }
    },
    extraReducers: (builder) => {
        builder
        //Create Ticket
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload
        })
        //Get all tickets for user
        .addCase(showTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(showTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(showTickets.rejected, (state, action) => {
            state.isSuccess = false
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        //Get single ticket for user
        .addCase(getTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
        //Close Ticket
        .addCase(closeOneTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket)
        })
    }
})




export const ticketReducer = ticketSlice.reducer
export const { resetTicket } = ticketSlice.actions
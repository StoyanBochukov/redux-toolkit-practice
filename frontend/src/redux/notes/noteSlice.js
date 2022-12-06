import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { noteService } from "./noteService";


//Get Ticket notes
export const getNotes = createAsyncThunk('notes/getAll', async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.getTicketNotes(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Create a ticket note
export const createNotes = createAsyncThunk('notes/create', async({noteText, ticketId}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.createNote(noteText, ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})




const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers:{
        resetNote: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        //Get all notes
        .addCase(getNotes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        //Create new note
        .addCase(createNotes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload)
        })
        .addCase(createNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const notesReducer = noteSlice.reducer
export const { resetNote } = noteSlice.actions
import axios from "axios";
const API_URL = '/api/tickets/'

const getTicketNotes = async(ticketId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get(API_URL + ticketId + '/notes', config)
    return data
}


const createNote = async(noteText, ticketId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.post(API_URL + ticketId + '/notes',{text: noteText}, config)
    return data
}


export const noteService = {
    getTicketNotes,
    createNote
    
}
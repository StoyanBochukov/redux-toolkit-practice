import axios from "axios";
const API_URL = '/api/tickets/'



//Create Ticket
const createTicket = async(ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.post(API_URL, ticketData, config)
    
    return data
}

//Get all Tickets
const showTicket = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get(API_URL, config)

    return data
}

//Get single ticket
const getTicket = async(ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await axios.get(API_URL + ticketId, config)
    return data
}

//Close ticket
const closeTicket = async(ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + ticketId, { status: 'closed' }, config)
    return response.data
}




const ticketService = {
    createTicket,
    showTicket,
    getTicket,
    closeTicket
}

export default ticketService
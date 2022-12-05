import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { showTickets, resetTicket } from '../redux/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {

    const dispatch = useDispatch()
    const { tickets, isError, isSuccess, isLoading, message } = useSelector(state => state.ticket)

    //Clear the state on onMount
    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(resetTicket())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(showTickets())
    }, [dispatch])


    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <BackButton url='/' />
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets.map((ticket) => (
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
        </div>
    </>
  )
}

export default Tickets
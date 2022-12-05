import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { getTicket, resetTicket, closeOneTicket } from '../redux/tickets/ticketSlice'
import { toast } from 'react-toastify'



const Ticket = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()
    const { ticket, tickets, isSuccess, isLoading, isError, message } = useSelector(state => state.ticket)
    const ticketData = {
      status: 'closed'
    }

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
    }, [message, isError, dispatch, ticketId])

    if(isLoading){
      return <Spinner />
    }

    if(isError){
      return <h3>Something Went Wrong</h3>
    }

    //Close Ticket
    const onTicketClose = () => {
      dispatch(closeOneTicket(ticketId))
      toast.success('Ticket Closed')
      navigate('/tickets')
     
    }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Data Submitted: {new Date(ticket.createdAt).toLocaleDateString('en-UK')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
      )}

    </div>
  )
}

export default Ticket
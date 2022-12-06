import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { FaPlus, FaRegWindowClose } from 'react-icons/fa'
import { getTicket, resetTicket, closeOneTicket } from '../redux/tickets/ticketSlice'
import { getNotes, resetNote, createNotes } from '../redux/notes/noteSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import NoteItem from '../components/NoteItem'


const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root')


const Ticket = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ticketId } = useParams()
    const { ticket, isSuccess, isLoading, isError, message } = useSelector(state => state.ticket)
    const { 
      notes,
      isSuccess: noteSuccess,
      isLoading: noteLoading,
      isError: noteError,
      message: noteMessage
    } = useSelector(state => state.notes)
    

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [message, isError, dispatch, ticketId])

    if(isLoading || noteLoading){
      return <Spinner />
    }

    if(isError || noteError){
      return <h3>Something Went Wrong</h3>
    }

    //Close Ticket
    const onTicketClose = () => {
      dispatch(closeOneTicket(ticketId))
      toast.success('Ticket Closed')
      navigate('/tickets')
    }

    //Note text submit
    const onNoteSubmit = (e) => {
      e.preventDefault()
      dispatch(createNotes({noteText, ticketId}))
      closeModal()
      setNoteText('')
    }

    //Open/Close Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    //Reset text area statement
    const resetText = () => {

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
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={openModal}><FaPlus />Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
       style={customStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal} ><FaRegWindowClose /></button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" className='form-control'
            placeholder='Note text' value={noteText} onChange={(e) => setNoteText(e.target.value)} ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Submit</button>
          </div>
        </form>
       </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
      )}

    </div>
  )
}

export default Ticket